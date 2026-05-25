"use client";

import { useState, useCallback, useMemo, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Handshake,
  ArrowLeft,
  Link2,
  Plus,
  X,
  Check,
  AlertTriangle,
  ThumbsUp,
  Minus,
  ChevronDown,
  ChevronRight,
  Users,
  Trash2,
} from "lucide-react";
import { films, Film as FilmType } from "@/data/films";
import { JURIES, JuryKey } from "@/lib/scoring";
import { juryColorClasses, juryIcons } from "@/lib/jury-ui";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// ─── Decode assignments from URL param ─────────────────────────
function decodeAssignments(encoded: string): Record<number, string> {
  try {
    const json = decodeURIComponent(atob(encoded));
    return JSON.parse(json);
  } catch {
    return {};
  }
}

// ─── Extract proposal from URL string ──────────────────────────
function extractProposal(url: string): { name: string; assignments: Record<number, string> } | null {
  try {
    const parsed = new URL(url.trim());
    const param = parsed.searchParams.get("p");
    if (!param) return null;
    const assignments = decodeAssignments(param);
    if (Object.keys(assignments).length === 0) return null;
    return {
      name: `Persona`,
      assignments,
    };
  } catch {
    return null;
  }
}

// ─── Consensus result types ────────────────────────────────────
type ConsensusStatus = "unanimous" | "majority" | "split" | "unassigned";

interface FilmConsensus {
  film: FilmType;
  juryCounts: Record<JuryKey, number>;
  totalVotes: number;
  winner: JuryKey | null;
  status: ConsensusStatus;
  winnerCount: number;
  totalParticipants: number;
}

function computeConsensus(
  proposals: Record<number, string>[]
): FilmConsensus[] {
  const totalParticipants = proposals.length;
  if (totalParticipants === 0) return [];

  return films.map((film) => {
    const juryCounts: Record<JuryKey, number> = {
      jovenes: 0,
      mayores: 0,
      cultural: 0,
      instagram: 0,
      socios: 0,
    };
    let totalVotes = 0;

    proposals.forEach((assignment) => {
      const jury = assignment[film.id];
      if (jury && jury in juryCounts) {
        juryCounts[jury as JuryKey]++;
        totalVotes++;
      }
    });

    // Find winner
    let maxCount = 0;
    let winner: JuryKey | null = null;
    let winnerCount = 0;

    (Object.entries(juryCounts) as [JuryKey, number][]).forEach(([key, count]) => {
      if (count > maxCount) {
        maxCount = count;
        winner = key;
        winnerCount = count;
      }
    });

    // Check for ties
    const tied = (Object.values(juryCounts) as number[]).filter((c) => c === maxCount && c > 0);
    if (tied.length > 1) {
      winner = null;
    }

    let status: ConsensusStatus = "unassigned";
    if (totalVotes === 0) {
      status = "unassigned";
    } else if (winner && winnerCount === totalParticipants) {
      status = "unanimous";
    } else if (winner && winnerCount >= Math.ceil(totalParticipants / 2)) {
      status = "majority";
    } else {
      status = "split";
    }

    return {
      film,
      juryCounts,
      totalVotes,
      winner,
      status,
      winnerCount,
      totalParticipants,
    };
  });
}

// ─── Main Page ─────────────────────────────────────────────────
function ConsensoContent() {
  const searchParams = useSearchParams();

  // State
  const [urlInputs, setUrlInputs] = useState<string[]>([""]);
  const [parsedProposals, setParsedProposals] = useState<
    { url: string; assignments: Record<number, string> }[]
  >([]);
  const [showUnanimous, setShowUnanimous] = useState(true);
  const [showMajority, setShowMajority] = useState(true);
  const [showSplit, setShowSplit] = useState(true);
  const [showUnassigned, setShowUnassigned] = useState(true);
  const [expandedFilm, setExpandedFilm] = useState<number | null>(null);

  // Auto-load from URL if coming from programacion
  const autoParam = searchParams.get("p");
  const hasAutoParam = autoParam && autoParam.length > 0;

  const handleAddUrl = useCallback(() => {
    setUrlInputs((prev) => [...prev, ""]);
  }, []);

  const handleRemoveUrl = useCallback((index: number) => {
    setUrlInputs((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const handleUrlChange = useCallback((index: number, value: string) => {
    setUrlInputs((prev) => prev.map((u, i) => (i === index ? value : u)));
  }, []);

  const handleParse = useCallback(() => {
    const results: { url: string; assignments: Record<number, string> }[] = [];

    // Include auto-param if present
    if (hasAutoParam) {
      const autoAssignments = decodeAssignments(autoParam);
      if (Object.keys(autoAssignments).length > 0) {
        results.push({
          url: "Propuesta actual",
          assignments: autoAssignments,
        });
      }
    }

    // Parse URL inputs
    urlInputs.forEach((url) => {
      const trimmed = url.trim();
      if (!trimmed) return;
      const proposal = extractProposal(trimmed);
      if (proposal) {
        results.push({ url: trimmed, assignments: proposal.assignments });
      }
    });

    setParsedProposals(results);
  }, [urlInputs, hasAutoParam, autoParam]);

  const consensus = useMemo(
    () => computeConsensus(parsedProposals.map((p) => p.assignments)),
    [parsedProposals]
  );

  const stats = useMemo(() => {
    const total = consensus.length;
    const unanimous = consensus.filter((c) => c.status === "unanimous").length;
    const majority = consensus.filter((c) => c.status === "majority").length;
    const split = consensus.filter((c) => c.status === "split").length;
    const unassigned = consensus.filter((c) => c.status === "unassigned").length;
    return { total, unanimous, majority, split, unassigned };
  }, [consensus]);

  const filteredConsensus = consensus
    .filter((c) => {
      if (c.status === "unanimous" && !showUnanimous) return false;
      if (c.status === "majority" && !showMajority) return false;
      if (c.status === "split" && !showSplit) return false;
      if (c.status === "unassigned" && !showUnassigned) return false;
      return true;
    })
    .sort((a, b) => {
      const order: Record<ConsensusStatus, number> = { unanimous: 0, majority: 1, split: 2, unassigned: 3 };
      return order[a.status] - order[b.status];
    });

  const statusConfig: Record<
    ConsensusStatus,
    { label: string; color: string; bg: string; icon: React.ElementType }
  > = {
    unanimous: {
      label: "Unanimidad",
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800/40",
      icon: ThumbsUp,
    },
    majority: {
      label: "Mayoría",
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800/40",
      icon: Check,
    },
    split: {
      label: "Debate",
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800/40",
      icon: AlertTriangle,
    },
    unassigned: {
      label: "Sin asignar",
      color: "text-zinc-500 dark:text-zinc-400",
      bg: "bg-zinc-50 dark:bg-zinc-900/40 border-zinc-200 dark:border-zinc-700/40",
      icon: Minus,
    },
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* ── Header ─────────────────────────────────────────── */}
      <header className="relative overflow-hidden border-b border-border/30">
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-violet-800/25 via-transparent to-transparent" />

        <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-7xl mx-auto">
            <Link
              href="/programacion"
              className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-200 mb-4 transition-colors"
            >
              <ArrowLeft className="h-3 w-3" />
              Volver a programación
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2.5 bg-violet-500/15 rounded-xl border border-violet-500/20 backdrop-blur-sm">
                  <Handshake className="h-5 w-5 text-violet-400" />
                </div>
                <Badge
                  variant="outline"
                  className="border-violet-500/25 text-violet-300/80 text-[11px] font-medium tracking-wide"
                >
                  CONSENSO
                </Badge>
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2">
                Vista de consenso
              </h1>
              <p className="text-zinc-300 text-base leading-relaxed">
                Compara las propuestas de todas las personas del grupo y encuentra los puntos de acuerdo.
              </p>
              <p className="text-zinc-400 text-sm leading-relaxed mt-1">
                Pega los enlaces compartidos y pulsa comparar para ver el resultado.
              </p>
            </motion.div>
          </div>
        </div>
      </header>

      {/* ── Main Content ───────────────────────────────────── */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* ── Input section ────────────────────────────────── */}
        <Card className="mb-6 border-border/60">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <Link2 className="h-4 w-4 text-muted-foreground" />
              Enlaces de propuestas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {hasAutoParam && (
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/30 text-xs text-emerald-700 dark:text-emerald-300">
                <Check className="h-3.5 w-3.5 shrink-0" />
                Tu propuesta actual se incluirá automáticamente
              </div>
            )}

            {urlInputs.map((url, idx) => (
              <div key={idx} className="flex gap-2">
                <div className="flex items-center gap-2 text-xs text-muted-foreground shrink-0 w-6 justify-center">
                  {hasAutoParam ? idx + 2 : idx + 1}
                </div>
                <input
                  type="text"
                  value={url}
                  onChange={(e) => handleUrlChange(idx, e.target.value)}
                  placeholder="Pega aquí un enlace de propuesta compartido..."
                  className="flex-1 text-sm px-3 py-2 rounded-lg bg-background border border-border/60 focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-500/50 placeholder:text-muted-foreground/50"
                />
                {urlInputs.length > 1 && (
                  <button
                    onClick={() => handleRemoveUrl(idx)}
                    className="p-2 rounded-lg text-muted-foreground/40 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            ))}

            <div className="flex gap-2 pt-1">
              <Button variant="outline" size="sm" onClick={handleAddUrl} className="gap-1.5 text-xs">
                <Plus className="h-3.5 w-3.5" />
                Añadir enlace
              </Button>
              <Button size="sm" onClick={handleParse} className="gap-1.5 text-xs">
                Comparar propuestas
              </Button>
              {parsedProposals.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setParsedProposals([])}
                  className="gap-1.5 text-xs text-muted-foreground"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Limpiar
                </Button>
              )}
            </div>

            {parsedProposals.length > 0 && (
              <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                <Users className="h-3.5 w-3.5" />
                {parsedProposals.length} propuesta{parsedProposals.length > 1 ? "s" : ""} cargada{parsedProposals.length > 1 ? "s" : ""}
              </p>
            )}
          </CardContent>
        </Card>

        {/* ── Consensus results ────────────────────────────── */}
        <AnimatePresence>
          {parsedProposals.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Stats bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-5">
                {(
                  [
                    { key: "unanimous" as const, label: "Unanimidad", count: stats.unanimous },
                    { key: "majority" as const, label: "Mayoría", count: stats.majority },
                    { key: "split" as const, label: "Debate", count: stats.split },
                    { key: "unassigned" as const, label: "Sin asignar", count: stats.unassigned },
                  ] as const
                ).map((s) => {
                  const cfg = statusConfig[s.key];
                  const Icon = cfg.icon;
                  const show =
                    s.key === "unanimous"
                      ? showUnanimous
                      : s.key === "majority"
                        ? showMajority
                        : s.key === "split"
                          ? showSplit
                          : showUnassigned;
                  const toggle =
                    s.key === "unanimous"
                      ? () => setShowUnanimous(!showUnanimous)
                      : s.key === "majority"
                        ? () => setShowMajority(!showMajority)
                        : s.key === "split"
                          ? () => setShowSplit(!showSplit)
                          : () => setShowUnassigned(!showUnassigned);

                  return (
                    <button
                      key={s.key}
                      onClick={toggle}
                      className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border transition-all text-left ${
                        show
                          ? `${cfg.bg} ${cfg.color}`
                          : "bg-muted/30 border-border/30 text-muted-foreground/50 opacity-50"
                      }`}
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      <div>
                        <p className="text-xs font-semibold">{s.count}</p>
                        <p className="text-[10px] opacity-70">{s.label}</p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Film list */}
              <div className="space-y-1.5">
                {filteredConsensus.map((c) => {
                  const cfg = statusConfig[c.status];
                  const Icon = cfg.icon;
                  const isExpanded = expandedFilm === c.film.id;

                  return (
                    <motion.div
                      key={c.film.id}
                      layout
                      className={`rounded-lg border transition-colors ${cfg.bg}`}
                    >
                      {/* Row header */}
                      <button
                        onClick={() => setExpandedFilm(isExpanded ? null : c.film.id)}
                        className="w-full flex items-center gap-3 px-3 py-2.5 text-left"
                      >
                        <Icon className={`h-4 w-4 shrink-0 ${cfg.color}`} />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{c.film.titulo}</p>
                          <p className="text-[11px] text-muted-foreground">
                            {c.film.direccion} · {c.film.pais}
                          </p>
                        </div>
                        {c.winner && (
                          <Badge
                            variant="secondary"
                            className={`text-[10px] font-semibold shrink-0 ${juryColorClasses[c.winner].badge}`}
                          >
                            {(() => {
                              const JIcon = juryIcons[c.winner];
                              return <JIcon className="h-3 w-3" />;
                            })()}
                            {JURIES.find((j) => j.key === c.winner)?.shortLabel}
                          </Badge>
                        )}
                        <div className="flex items-center gap-1 text-[10px] text-muted-foreground shrink-0">
                          <span className="font-semibold">{c.totalVotes}</span>
                          <span>/</span>
                          <span>{c.totalParticipants}</span>
                        </div>
                        {isExpanded ? (
                          <ChevronDown className="h-4 w-4 text-muted-foreground/50 shrink-0" />
                        ) : (
                          <ChevronRight className="h-4 w-4 text-muted-foreground/50 shrink-0" />
                        )}
                      </button>

                      {/* Expanded detail */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.15 }}
                            className="overflow-hidden"
                          >
                            <div className="px-3 pb-3 pt-1 border-t border-border/20">
                              <div className="grid grid-cols-5 gap-2 mt-2">
                                {JURIES.map((jury) => {
                                  const count = c.juryCounts[jury.key];
                                  const isWinner = jury.key === c.winner;
                                  const JIcon = juryIcons[jury.key];
                                  const pct =
                                    c.totalParticipants > 0
                                      ? Math.round((count / c.totalParticipants) * 100)
                                      : 0;

                                  return (
                                    <div
                                      key={jury.key}
                                      className={`text-center px-2 py-2 rounded-lg transition-colors ${
                                        isWinner
                                          ? `${juryColorClasses[jury.key].bg} ${juryColorClasses[jury.key].border} border`
                                          : "bg-muted/20"
                                      }`}
                                    >
                                      <JIcon
                                        className={`h-3.5 w-3.5 mx-auto mb-1 ${
                                          isWinner ? juryColorClasses[jury.key].text : "text-muted-foreground/40"
                                        }`}
                                      />
                                      <p
                                        className={`text-lg font-bold ${
                                          count > 0
                                            ? isWinner
                                              ? juryColorClasses[jury.key].text
                                              : "text-muted-foreground"
                                            : "text-muted-foreground/30"
                                        }`}
                                      >
                                        {count}
                                      </p>
                                      <p className="text-[9px] text-muted-foreground/60 leading-tight">
                                        {jury.shortLabel}
                                      </p>
                                      {count > 0 && (
                                        <div className="mt-1 h-1 rounded-full bg-muted overflow-hidden">
                                          <div
                                            className={`h-full rounded-full ${isWinner ? juryColorClasses[jury.key].dot : "bg-muted-foreground/30"}`}
                                            style={{ width: `${pct}%` }}
                                          />
                                        </div>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}

                {filteredConsensus.length === 0 && (
                  <div className="text-center py-8 text-sm text-muted-foreground">
                    No hay películas que coincidan con los filtros activos.
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty state */}
        {parsedProposals.length === 0 && (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-muted/50 mb-4">
              <Handshake className="h-7 w-7 text-muted-foreground/40" />
            </div>
            <p className="text-sm text-muted-foreground mb-1">
              Pega al menos un enlace de propuesta para comparar
            </p>
            <p className="text-xs text-muted-foreground/60">
              Cada persona puede compartir su enlace desde la pestaña de programación
            </p>
          </div>
        )}
      </main>

      {/* ── Footer ─────────────────────────────────────────── */}
      <footer className="border-t border-border/30 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Handshake className="h-3.5 w-3.5 text-muted-foreground/50" />
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

export default function ConsensoPage() {
  return (
    <Suspense>
      <ConsensoContent />
    </Suspense>
  );
}
