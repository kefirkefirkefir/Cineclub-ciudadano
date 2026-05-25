"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Film,
  Zap,
  Heart,
  BookOpen,
  Camera,
  Users,
  ArrowLeft,
  Sparkles,
  RotateCcw,
  ChevronDown,
  X,
  MoveRight,
  Trash2,
  Clapperboard,
  GripVertical,
  Share2,
  Check,
  Copy,
  Handshake,
} from "lucide-react";
import { films, Film as FilmType } from "@/data/films";
import { autoAssign, JURIES, JuryKey, scoreAllFilms } from "@/lib/scoring";
import { juryColorClasses, juryIcons } from "@/lib/jury-ui";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// ─── Share encoding ──────────────────────────────────────────
function encodeAssignments(assignments: Record<number, string>): string {
  const json = JSON.stringify(assignments);
  return btoa(encodeURIComponent(json));
}

// ─── localStorage persistence ──────────────────────────────────
const STORAGE_KEY = "cineclub-programacion-assignments";

function loadAssignments(): Record<number, string> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveAssignments(assignments: Record<number, string>) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(assignments));
}

// ─── Film mini card ────────────────────────────────────────────
function FilmChip({
  film,
  action,
  onAssign,
  onUnassign,
}: {
  film: FilmType;
  action?: "assign" | "move" | "unassign";
  onAssign?: (film: FilmType, juryKey: JuryKey) => void;
  onUnassign?: (film: FilmType) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 4 }}
      transition={{ duration: 0.15 }}
      className="group relative"
    >
      {/* Compact vertical card */}
      <div className="rounded-lg bg-card border border-border/40 shadow-sm hover:shadow-md transition-shadow">
        {/* Title row */}
        <div className="flex items-start gap-1.5 px-2.5 py-2">
          {/* Badges dots */}
          <div className="flex flex-col gap-0.5 pt-0.5 shrink-0">
            {film.directora && <span className="w-1.5 h-1.5 rounded-full bg-rose-400" title="Directora" />}
            {film.hispanohablante && <span className="w-1.5 h-1.5 rounded-full bg-orange-400" title="Hispanohablante" />}
            {film.doblada && <span className="w-1.5 h-1.5 rounded-full bg-sky-400" title="Doblada" />}
            {film.tComunitaria && <span className="w-1.5 h-1.5 rounded-full bg-teal-400" title="Temática comunitaria" />}
          </div>
          {/* Title + subtitle — allows wrapping for long titles */}
          <p className="flex-1 text-[11px] font-medium leading-tight break-words" title={film.titulo}>
            {film.titulo}
          </p>
          {/* Action button */}
          <div className="shrink-0">
            {action === "unassign" && onUnassign ? (
              <button
                onClick={() => onUnassign(film)}
                className="p-0.5 rounded text-muted-foreground/40 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                title="Devolver al pool"
              >
                <X className="h-3 w-3" />
              </button>
            ) : (action === "assign" || action === "move") && onAssign ? (
              <div className="relative">
                <button
                  onClick={() => setOpen(!open)}
                  className="p-0.5 rounded text-muted-foreground/40 hover:text-primary hover:bg-primary/10 transition-colors"
                  title={action === "assign" ? "Asignar a jurado" : "Mover"}
                >
                  <MoveRight className="h-3 w-3" />
                </button>
                <AnimatePresence>
                  {open && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      className="absolute right-0 bottom-full mb-1 z-50 bg-popover border border-border rounded-lg shadow-lg py-1 min-w-[150px]"
                    >
                      {action === "move" && onUnassign && (
                        <button
                          onClick={() => { onUnassign(film); setOpen(false); }}
                          className="w-full text-left px-2.5 py-1.5 text-xs hover:bg-muted/50 transition-colors text-red-600 flex items-center gap-1.5"
                        >
                          <Trash2 className="h-3 w-3" />
                          Devolver al pool
                        </button>
                      )}
                      {action === "move" && onUnassign && <Separator className="my-1" />}
                      {JURIES.map((j) => (
                        <button
                          key={j.key}
                          onClick={() => { onAssign(film, j.key); setOpen(false); }}
                          className={`w-full text-left px-2.5 py-1.5 text-xs hover:bg-muted/50 transition-colors flex items-center gap-1.5 ${juryColorClasses[j.key].text}`}
                        >
                          {(() => { const Icon = juryIcons[j.key]; return <Icon className="h-3 w-3" />; })()}
                          {action === "move" ? `Mover a ${j.shortLabel}` : j.shortLabel}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : null}
          </div>
        </div>
        {/* Director + country — shown below title, wraps naturally */}
        <div className="px-2.5 pb-2 pl-5">
          <p className="text-[10px] text-muted-foreground/70 leading-snug">
            {film.direccion} · {film.pais}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Jury Column ───────────────────────────────────────────────
function JuryColumn({
  jury,
  assignedFilms,
  onAssign,
  onUnassign,
}: {
  jury: (typeof JURIES)[number];
  assignedFilms: FilmType[];
  onAssign: (film: FilmType, juryKey: JuryKey) => void;
  onUnassign: (film: FilmType) => void;
}) {
  const colors = juryColorClasses[jury.key];
  const Icon = juryIcons[jury.key];

  return (
    <Card className={`${colors.bg} ${colors.border} border flex flex-col`}>
      {/* Column header */}
      <CardHeader className="pb-2 pt-3 px-3">
        <div className="flex items-center gap-2">
          <div className={`p-1.5 rounded-md ${colors.badge}`}>
            <Icon className="h-3.5 w-3.5" />
          </div>
          <div className="min-w-0 flex-1">
            <CardTitle className={`text-xs font-semibold ${colors.text}`}>
              {jury.shortLabel}
            </CardTitle>
            <p className="text-[10px] text-muted-foreground line-clamp-2 leading-tight">
              {jury.description}
            </p>
          </div>
          <Badge
            variant="secondary"
            className={`text-[10px] font-bold ${colors.badge} shrink-0`}
          >
            {assignedFilms.length}
          </Badge>
        </div>
      </CardHeader>

      {/* Films list — grows naturally, scroll only when needed */}
      <CardContent className="flex-1 px-2 pb-2 min-h-0">
        <div className="space-y-1.5">
            <AnimatePresence>
              {assignedFilms.length === 0 && (
                <p className="text-[10px] text-muted-foreground/60 text-center py-4 italic">
                  Sin películas asignadas
                </p>
              )}
              {assignedFilms.map((film) => (
                <FilmChip
                  key={film.id}
                  film={film}
                  action="move"
                  onAssign={onAssign}
                  onUnassign={onUnassign}
                />
              ))}
            </AnimatePresence>
          </div>
      </CardContent>
    </Card>
  );
}

// ─── Main Page ─────────────────────────────────────────────────
export default function ProgramacionPage() {
  const [assignments, setAssignments] = useState<Record<number, string>>({});
  const [mounted, setMounted] = useState(false);
  const [mobileTab, setMobileTab] = useState<JuryKey>("jovenes");
  const [showScoring, setShowScoring] = useState(false);
  const [copied, setCopied] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    setAssignments(loadAssignments());
    setMounted(true);
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    if (mounted) {
      saveAssignments(assignments);
    }
  }, [assignments, mounted]);

  // Organized film lists
  const { unassigned, byJury } = useMemo(() => {
    const unassigned: FilmType[] = [];
    const byJury: Record<JuryKey, FilmType[]> = {
      jovenes: [],
      mayores: [],
      cultural: [],
      instagram: [],
      socios: [],
    };

    for (const film of films) {
      const jury = assignments[film.id];
      if (jury && jury in byJury) {
        byJury[jury as JuryKey].push(film);
      } else {
        unassigned.push(film);
      }
    }

    return { unassigned, byJury };
  }, [assignments]);

  // Scoring data (for display)
  const scores = useMemo(() => scoreAllFilms(films), []);

  const handleAutoAssign = useCallback(() => {
    const newAssignments = autoAssign(films, assignments, 5);
    setAssignments(newAssignments);
  }, [assignments]);

  const handleClearAll = useCallback(() => {
    setAssignments({});
  }, []);

  const handleShare = useCallback(() => {
    const encoded = encodeAssignments(assignments);
    const url = `${window.location.origin}/programacion?p=${encoded}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  }, [assignments]);

  const handleAssignToJury = useCallback(
    (filmId: number, juryKey: string) => {
      setAssignments((prev) => ({ ...prev, [filmId]: juryKey }));
    },
    []
  );

  const handleUnassign = useCallback((film: FilmType) => {
    setAssignments((prev) => {
      const next = { ...prev };
      delete next[film.id];
      return next;
    });
  }, []);

  const totalAssigned = Object.keys(assignments).length;

  if (!mounted) return null;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* ── Header ─────────────────────────────────────────── */}
      <header className="relative overflow-hidden border-b border-border/30">
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-800/25 via-transparent to-transparent" />

        <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-7xl mx-auto">
            {/* Back link */}
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-200 mb-4 transition-colors"
            >
              <ArrowLeft className="h-3 w-3" />
              Volver a la base de datos
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              {/* Columna izquierda — Info del página */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2.5 bg-amber-500/15 rounded-xl border border-amber-500/20 backdrop-blur-sm">
                    <Clapperboard className="h-5 w-5 text-amber-400" />
                  </div>
                  <Badge
                    variant="outline"
                    className="border-amber-500/25 text-amber-300/80 text-[11px] font-medium tracking-wide"
                  >
                    PROGRAMACIÓN
                  </Badge>
                </div>

                <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2">
                  Agrupamiento por jurados
                </h1>
                <p className="text-zinc-300 text-base leading-relaxed">
                  Distribuye las {films.length} películas entre los 5 jurados.
                </p>
                <p className="text-zinc-400 text-sm leading-relaxed mt-1">
                  Puedes usar la propuesta automática como punto de partida y ajustar manualmente lo que necesites.
                </p>
              </motion.div>

              {/* Columna derecha — Reclamo visual */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex items-center gap-3 px-4 py-4 rounded-xl bg-amber-500/10 border border-amber-500/30 backdrop-blur-sm"
              >
                <div className="shrink-0 flex items-center justify-center w-10 h-10 rounded-lg bg-amber-500/20">
                  <BookOpen className="h-5 w-5 text-amber-400" />
                </div>
                <div className="min-w-0">
                  <p className="text-amber-200 text-xs font-semibold tracking-wide uppercase">
                    Antes de empezar
                  </p>
                  <p className="text-zinc-300 text-sm leading-snug">
                    Revisa la base de datos completa para conocer cada película.
                  </p>
                </div>
                <Link
                  href="/"
                  className="shrink-0 ml-auto px-4 py-2 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/30 text-amber-200 text-xs font-medium transition-colors whitespace-nowrap"
                >
                  Ver base de datos
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </header>

      {/* ── Main Content ───────────────────────────────────── */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Action bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-6">
          <div className="flex flex-wrap gap-2">
            <Button onClick={handleAutoAssign} className="gap-2">
              <Sparkles className="h-4 w-4" />
              Generar propuesta automática
            </Button>
            {totalAssigned > 0 && (
              <>
                <Button variant="outline" onClick={handleClearAll} className="gap-2 text-muted-foreground">
                  <RotateCcw className="h-4 w-4" />
                  Limpiar todo
                </Button>
                <Button variant="outline" onClick={handleShare} className="gap-2 border-amber-500/30 text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/40">
                  {copied ? <Check className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
                  {copied ? "Enlace copiado" : "Compartir propuesta"}
                </Button>
              </>
            )}
          </div>
          <div className="text-sm text-muted-foreground sm:ml-auto flex items-center gap-3">
            <Link href="/consenso" className="text-xs text-amber-500 hover:text-amber-400 flex items-center gap-1 transition-colors">
              <Handshake className="h-3.5 w-3.5" />
              Ver consenso
            </Link>
            <span className="font-semibold text-foreground">{totalAssigned}</span> de {films.length} asignadas
            {totalAssigned > 0 && (
              <span className="text-muted-foreground/60">
                {" "}
                · {films.length - totalAssigned} sin asignar
              </span>
            )}
          </div>
        </div>

        {/* ── Unassigned pool (desktop) ────────────────────── */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-semibold">Sin asignar</h2>
              <Badge variant="secondary" className="text-[10px] font-bold">
                {unassigned.length}
              </Badge>
            </div>
            <button
              onClick={() => setShowScoring(!showScoring)}
              className="text-[11px] text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
            >
              Ver puntuaciones
              <ChevronDown
                className={`h-3 w-3 transition-transform ${showScoring ? "rotate-180" : ""}`}
              />
            </button>
          </div>

          {/* Scoring table (collapsible) */}
          <AnimatePresence>
            {showScoring && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden mb-4"
              >
                <Card className="bg-card border-border/40">
                  <CardContent className="p-3 overflow-x-auto">
                    <table className="w-full text-[10px]">
                      <thead>
                        <tr>
                          <th className="text-left py-1 px-2 font-semibold text-muted-foreground">
                            Película
                          </th>
                          {JURIES.map((j) => (
                            <th
                              key={j.key}
                              className={`text-center py-1 px-2 font-semibold ${juryColorClasses[j.key].text}`}
                            >
                              {j.shortLabel}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {films.map((film) => {
                          const filmScores = JURIES.map((j) => ({
                            key: j.key,
                            score:
                              scores[j.key].find((s) => s.filmId === film.id)
                                ?.score ?? 0,
                          }));
                          const maxScore = Math.max(...filmScores.map((s) => s.score));
                          return (
                            <tr key={film.id} className="border-t border-border/20">
                              <td className="py-1 px-2 font-medium truncate max-w-[200px]">
                                {film.titulo}
                              </td>
                              {filmScores.map((s) => (
                                <td
                                  key={s.key}
                                  className={`text-center py-1 px-2 font-mono ${
                                    s.score === maxScore && s.score > 0
                                      ? `font-bold ${juryColorClasses[s.key].text}`
                                      : "text-muted-foreground/50"
                                  }`}
                                >
                                  {s.score > 0 ? s.score : "—"}
                                </td>
                              ))}
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Unassigned film chips */}
          {unassigned.length > 0 ? (
            <div className="flex flex-wrap gap-1.5">
              <AnimatePresence>
                {unassigned.map((film) => (
                  <FilmChip
                    key={film.id}
                    film={film}
                    action="assign"
                    onAssign={(f, juryKey) => handleAssignToJury(f.id, juryKey)}
                  />
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <Card className="bg-card border-border/40 border-dashed">
              <CardContent className="p-4 text-center">
                <p className="text-xs text-muted-foreground">
                  Todas las películas están asignadas
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        <Separator className="mb-6" />

        {/* ── Mobile tab selector ──────────────────────────── */}
        <div className="flex gap-1.5 mb-4 overflow-x-auto pb-1 lg:hidden">
          {JURIES.map((j) => {
            const Icon = juryIcons[j.key];
            return (
              <button
                key={j.key}
                onClick={() => setMobileTab(j.key)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap border transition-all ${
                  mobileTab === j.key
                    ? `${juryColorClasses[j.key].badge} ${juryColorClasses[j.key].border}`
                    : "bg-muted/50 text-muted-foreground border-border/50 hover:bg-muted"
                }`}
              >
                <Icon className="h-3 w-3" />
                {j.shortLabel}
                <span className="font-bold">{byJury[j.key].length}</span>
              </button>
            );
          })}
        </div>

        {/* ── Jury columns (desktop: all visible, mobile: active tab) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-3 items-start">
          {JURIES.map((jury) => (
            <div key={jury.key} className={mobileTab !== jury.key ? "hidden lg:block" : ""}>
              <JuryColumn
                jury={jury}
                assignedFilms={byJury[jury.key]}
                onAssign={(film, juryKey) => handleAssignToJury(film.id, juryKey)}
                onUnassign={handleUnassign}
              />
            </div>
          ))}
        </div>
      </main>

      {/* ── Footer ─────────────────────────────────────────── */}
      <footer className="border-t border-border/30 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Clapperboard className="h-3.5 w-3.5 text-muted-foreground/50" />
            <span className="text-xs text-muted-foreground">
              Grupo de Trabajo de Cineclub
            </span>
          </Link>
          <div className="text-[11px] text-muted-foreground/40">
            Cineclub Ciudadano 2026
          </div>
        </div>
      </footer>
    </div>
  );
}
