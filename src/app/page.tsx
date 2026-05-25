"use client";

import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Film,
  Search,
  SlidersHorizontal,
  X,
  Globe,
  CheckCircle2,
  XCircle,
  Clapperboard,
  Star,
  ArrowUpRight,
  Disc3,
  Download,
  Languages,
  User,
  MapPin,
  Tag,
  Info,
  Award,
  LayoutGrid,
  LayoutList,
  TrendingUp,
} from "lucide-react";
import {
  films,
  allCountries,
  allGenres,
  allAvailability,
  Film as FilmType,
} from "@/data/films";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

// ─── Genre Color Map ────────────────────────────────────────────
const genreColors: Record<string, string> = {
  Drama: "from-rose-500/10 to-transparent border-rose-500/20",
  Documental: "from-emerald-500/10 to-transparent border-emerald-500/20",
  Thriller: "from-violet-500/10 to-transparent border-violet-500/20",
  "Thriller dramático": "from-violet-500/10 to-transparent border-violet-500/20",
  "Ciencia ficción": "from-cyan-500/10 to-transparent border-cyan-500/20",
  Comedia: "from-amber-500/10 to-transparent border-amber-500/20",
  Musical: "from-pink-500/10 to-transparent border-pink-500/20",
  Horror: "from-red-500/10 to-transparent border-red-500/20",
  "Horror psicológico": "from-red-500/10 to-transparent border-red-500/20",
  Animación: "from-indigo-500/10 to-transparent border-indigo-500/20",
};

const genreDots: Record<string, string> = {
  Drama: "bg-rose-500",
  Documental: "bg-emerald-500",
  Thriller: "bg-violet-500",
  "Thriller dramático": "bg-violet-500",
  "Ciencia ficción": "bg-cyan-500",
  Comedia: "bg-amber-500",
  "Comedia dramática": "bg-amber-500",
  Musical: "bg-pink-500",
  Horror: "bg-red-500",
  "Horror psicológico": "bg-red-500",
  Animación: "bg-indigo-500",
};

function getGenreColor(genre: string) {
  // Try exact match first
  if (genreColors[genre]) return genreColors[genre];
  // Try partial match
  for (const [key, val] of Object.entries(genreColors)) {
    if (genre.toLowerCase().includes(key.toLowerCase())) return val;
  }
  return "from-zinc-500/10 to-transparent border-zinc-500/20";
}

function getGenreDot(genre: string) {
  if (genreDots[genre]) return genreDots[genre];
  for (const [key, val] of Object.entries(genreDots)) {
    if (genre.toLowerCase().includes(key.toLowerCase())) return val;
  }
  return "bg-zinc-400";
}

// ─── Stat Card ───────────────────────────────────────────────────
function StatCard({
  icon: Icon,
  label,
  value,
  gradient,
}: {
  icon: React.ElementType;
  label: string;
  value: number | string;
  gradient: string;
}) {
  return (
    <motion.div whileHover={{ y: -1 }} transition={{ type: "spring", stiffness: 400, damping: 25 }}>
      <Card className="bg-card border-border/40 shadow-sm hover:shadow-md transition-shadow overflow-hidden relative group">
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
        <CardContent className="p-4 flex items-center gap-3.5 relative">
          <div className="p-2.5 rounded-xl bg-muted/80 group-hover:bg-primary/10 transition-colors">
            <Icon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
          </div>
          <div className="min-w-0">
            <p className="text-2xl font-bold tracking-tight leading-none">{value}</p>
            <p className="text-[11px] text-muted-foreground mt-1.5 truncate">{label}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// ─── Film Row (table) ───────────────────────────────────────────
function FilmRow({
  film,
  index,
  onSelect,
}: {
  film: FilmType;
  index: number;
  onSelect: (film: FilmType) => void;
}) {
  const availColor =
    film.disponibilidad === "Blu ray"
      ? "text-blue-500"
      : film.disponibilidad === "DVD"
        ? "text-amber-500"
        : "text-emerald-500";

  return (
    <motion.tr
      initial={{ opacity: 0, x: -4 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.015, duration: 0.2 }}
      className={`border-b border-border/20 transition-colors cursor-pointer group ${index % 2 === 0 ? "bg-transparent" : "bg-muted/20"} hover:bg-primary/5`}
      onClick={() => onSelect(film)}
    >
      <td className="py-3 px-4">
        <div className="flex items-center gap-2.5">
          <span
            className={`w-1.5 h-1.5 rounded-full shrink-0 ${getGenreDot(film.genero)}`}
          />
          <span className="font-medium text-sm group-hover:text-primary transition-colors">
            {film.titulo}
          </span>
        </div>
      </td>
      <td className="py-3 px-4 text-sm text-muted-foreground hidden md:table-cell">
        <span className="font-normal">{film.direccion}</span>
      </td>
      <td className="py-3 px-4 text-sm hidden lg:table-cell">
        <span className="text-muted-foreground">{film.pais}</span>
      </td>
      <td className="py-3 px-4 hidden sm:table-cell">
        <div className="flex items-center gap-1.5">
          <span className={`w-1.5 h-1.5 rounded-full ${getGenreDot(film.genero)}`} />
          <span className="text-xs text-muted-foreground">{film.genero}</span>
        </div>
      </td>
      <td className="py-3 px-4 hidden xl:table-cell">
        <span className={`text-xs font-medium ${availColor}`}>
          {film.disponibilidad === "Blu ray"
            ? "Blu-ray"
            : film.disponibilidad === "DVD"
              ? "DVD"
              : "Digital"}
        </span>
      </td>
      <td className="py-3 px-4 hidden lg:table-cell">
        <div className="flex gap-1.5 flex-wrap">
          {film.directora && (
            <Badge
              variant="secondary"
              className="text-[10px] px-2 py-0.5 font-medium bg-rose-50 text-rose-700 border-rose-200/50 hover:bg-rose-100"
            >
              Mujer
            </Badge>
          )}
          {film.hispanohablante && (
            <Badge
              variant="secondary"
              className="text-[10px] px-2 py-0.5 font-medium bg-orange-50 text-orange-700 border-orange-200/50 hover:bg-orange-100"
            >
              ES
            </Badge>
          )}
          {film.doblada && (
            <Badge
              variant="secondary"
              className="text-[10px] px-2 py-0.5 font-medium bg-sky-50 text-sky-700 border-sky-200/50 hover:bg-sky-100"
            >
              Dob.
            </Badge>
          )}
        </div>
      </td>
      <td className="py-3 px-3 text-right w-10">
        <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground/40 group-hover:text-primary transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </td>
    </motion.tr>
  );
}

// ─── Film Card (grid) ───────────────────────────────────────────
function FilmCardGrid({
  film,
  index,
  onSelect,
}: {
  film: FilmType;
  index: number;
  onSelect: (film: FilmType) => void;
}) {
  const colorClasses = getGenreColor(film.genero);
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ delay: index * 0.03, duration: 0.25 }}
      whileHover={{ y: -3 }}
      className="group"
    >
      <Card
        className={`bg-card border-border/40 hover:border-primary/30 transition-all cursor-pointer overflow-hidden shadow-sm hover:shadow-lg h-full relative`}
        onClick={() => onSelect(film)}
      >
        {/* Genre color accent bar */}
        <div className={`h-0.5 bg-gradient-to-r ${colorClasses.replace(/from-\S+\s+to-transparent\s+border-\S+/, "from-rose-400 via-amber-400 to-violet-400")}`} />
        <div className={`absolute top-0 left-0 w-0.5 h-full bg-gradient-to-b ${colorClasses}`} />

        <CardHeader className="pb-1 pt-4 px-4">
          <div className="flex items-start justify-between gap-2 pl-2">
            <CardTitle className="text-sm font-semibold leading-snug group-hover:text-primary transition-colors line-clamp-2">
              {film.titulo}
            </CardTitle>
          </div>
          <p className="text-xs text-muted-foreground/80 pl-2 mt-0.5 truncate">
            {film.direccion}
          </p>
        </CardHeader>
        <CardContent className="px-4 pb-4 flex flex-col gap-2.5 pl-5">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${getGenreDot(film.genero)}`} />
            <span>{film.genero}</span>
            <span className="text-border">·</span>
            <span>{film.pais}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Badge
              variant="secondary"
              className={`text-[10px] font-medium px-2 py-0.5 ${
                film.disponibilidad === "Blu ray"
                  ? "bg-blue-50 text-blue-700 border-blue-200/50"
                  : film.disponibilidad === "DVD"
                    ? "bg-amber-50 text-amber-700 border-amber-200/50"
                    : "bg-emerald-50 text-emerald-700 border-emerald-200/50"
              }`}
            >
              {film.disponibilidad === "Blu ray"
                ? "Blu-ray"
                : film.disponibilidad === "DVD"
                  ? "DVD"
                  : "Digital"}
            </Badge>
            {film.directora && (
              <Badge variant="secondary" className="text-[10px] font-medium px-2 py-0.5 bg-rose-50 text-rose-700 border-rose-200/50">
                Directora
              </Badge>
            )}
            {film.hispanohablante && (
              <Badge variant="secondary" className="text-[10px] font-medium px-2 py-0.5 bg-orange-50 text-orange-700 border-orange-200/50">
                ES
              </Badge>
            )}
          </div>

          <div className="mt-auto pt-2">
            <p className="text-xs text-muted-foreground/70 leading-relaxed line-clamp-2">
              {film.descripcion.slice(0, 120)}...
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// ─── Film Detail Modal ───────────────────────────────────────────
function FilmDetail({
  film,
  open,
  onClose,
}: {
  film: FilmType | null;
  open: boolean;
  onClose: () => void;
}) {
  if (!film) return null;
  const dotColor = getGenreDot(film.genero);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[88vh] overflow-hidden p-0 gap-0">
        {/* Header accent */}
        <div className={`h-1 bg-gradient-to-r ${getGenreColor(film.genero).replace(/from-\S+\s+to-transparent\s+border-\S+/, "from-rose-400 via-amber-400 to-violet-400")}`} />

        <ScrollArea className="max-h-[calc(88vh-4px)]">
          <div className="p-6 sm:p-8">
            <DialogHeader className="space-y-3">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${dotColor}`} />
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {film.genero}
                </span>
              </div>
              <DialogTitle className="text-2xl sm:text-3xl font-bold tracking-tight pr-8 leading-tight">
                {film.titulo}
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground flex flex-wrap items-center gap-x-3 gap-y-1">
                <span className="flex items-center gap-1.5">
                  <User className="h-3.5 w-3.5" />
                  {film.direccion}
                </span>
                <span className="text-border hidden sm:inline">·</span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5" />
                  {film.pais}
                </span>
              </DialogDescription>
            </DialogHeader>

            {/* Attribute pills */}
            <div className="mt-6 flex flex-wrap gap-2">
              <Badge
                variant="secondary"
                className={`text-xs px-2.5 py-1 font-medium ${
                  film.disponibilidad === "Blu ray"
                    ? "bg-blue-50 text-blue-700 border-blue-200/50"
                    : film.disponibilidad === "DVD"
                      ? "bg-amber-50 text-amber-700 border-amber-200/50"
                      : "bg-emerald-50 text-emerald-700 border-emerald-200/50"
                }`}
              >
                {film.disponibilidad}
              </Badge>
              {film.directora && (
                <Badge variant="secondary" className="text-xs px-2.5 py-1 font-medium bg-rose-50 text-rose-700 border-rose-200/50">
                  Dirigida por mujer
                </Badge>
              )}
              {film.hispanohablante && (
                <Badge variant="secondary" className="text-xs px-2.5 py-1 font-medium bg-orange-50 text-orange-700 border-orange-200/50">
                  Hispanohablante
                </Badge>
              )}
              {film.doblada && (
                <Badge variant="secondary" className="text-xs px-2.5 py-1 font-medium bg-sky-50 text-sky-700 border-sky-200/50">
                  Doblada
                </Badge>
              )}
              {film.cineNoUSA && (
                <Badge variant="secondary" className="text-xs px-2.5 py-1 font-medium bg-violet-50 text-violet-700 border-violet-200/50">
                  Cine no USA
                </Badge>
              )}
              {film.tComunitaria && (
                <Badge variant="secondary" className="text-xs px-2.5 py-1 font-medium bg-teal-50 text-teal-700 border-teal-200/50">
                  Temática comunitaria
                </Badge>
              )}
            </div>

            {/* Synopsis */}
            <div className="mt-7">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
                <Film className="h-3.5 w-3.5" />
                Sinopsis
              </h3>
              <p className="text-sm leading-[1.75] text-foreground/80">
                {film.descripcion}
              </p>
            </div>

            <Separator className="my-7" />

            {/* Importance — highlighted section */}
            <div className="rounded-xl bg-amber-50/80 border border-amber-200/50 p-5 sm:p-6">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-amber-800/70 mb-3 flex items-center gap-2">
                <Award className="h-3.5 w-3.5" />
                Importancia cinematográfica
              </h3>
              <p className="text-sm leading-[1.75] text-amber-950/80">
                {film.importancia}
              </p>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

// ─── Filter Pill Toggle ──────────────────────────────────────────
function FilterPill({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`
        inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-150 border
        ${
          checked
            ? "bg-primary text-primary-foreground border-primary shadow-sm"
            : "bg-muted/50 text-muted-foreground border-border/50 hover:bg-muted hover:text-foreground"
        }
      `}
    >
      {checked && <CheckCircle2 className="h-3 w-3" />}
      {!checked && <XCircle className="h-3 w-3 opacity-40" />}
      {label}
    </button>
  );
}

// ─── Loading Skeleton ────────────────────────────────────────────
function LoadingSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="bg-card border-border/40">
            <CardContent className="p-4 flex items-center gap-3">
              <Skeleton className="h-9 w-9 rounded-lg" />
              <div className="space-y-1.5 flex-1">
                <Skeleton className="h-5 w-8" />
                <Skeleton className="h-3 w-20" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card className="bg-card border-border/40">
        <div className="p-4 space-y-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4">
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-4 w-32 hidden md:block" />
              <Skeleton className="h-4 w-20 hidden lg:block" />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────
export default function CineclubDB() {
  const [search, setSearch] = useState("");
  const [countryFilter, setCountryFilter] = useState<string>("all");
  const [genreFilter, setGenreFilter] = useState<string>("all");
  const [availFilter, setAvailFilter] = useState<string>("all");
  const [filterDir, setFilterDir] = useState(false);
  const [filterComm, setFilterComm] = useState(false);
  const [filterNoUSA, setFilterNoUSA] = useState(false);
  const [filterDoblada, setFilterDoblada] = useState(false);
  const [filterHisp, setFilterHisp] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilm, setSelectedFilm] = useState<FilmType | null>(null);
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");

  const filteredFilms = useMemo(() => {
    return films.filter((f) => {
      if (
        search &&
        !f.titulo.toLowerCase().includes(search.toLowerCase()) &&
        !f.direccion.toLowerCase().includes(search.toLowerCase()) &&
        !f.genero.toLowerCase().includes(search.toLowerCase()) &&
        !f.pais.toLowerCase().includes(search.toLowerCase())
      )
        return false;
      if (countryFilter !== "all" && f.pais !== countryFilter) return false;
      if (genreFilter !== "all" && f.genero !== genreFilter) return false;
      if (availFilter !== "all" && f.disponibilidad !== availFilter) return false;
      if (filterDir && !f.directora) return false;
      if (filterComm && !f.tComunitaria) return false;
      if (filterNoUSA && !f.cineNoUSA) return false;
      if (filterDoblada && !f.doblada) return false;
      if (filterHisp && !f.hispanohablante) return false;
      return true;
    });
  }, [search, countryFilter, genreFilter, availFilter, filterDir, filterComm, filterNoUSA, filterDoblada, filterHisp]);

  const stats = useMemo(
    () => ({
      total: films.length,
      directoras: films.filter((f) => f.directora).length,
      paises: allCountries.length,
      generos: allGenres.length,
      hispanohablantes: films.filter((f) => f.hispanohablante).length,
      noUSA: films.filter((f) => f.cineNoUSA).length,
    }),
    []
  );

  const activeFiltersCount = [
    filterDir,
    filterComm,
    filterNoUSA,
    filterDoblada,
    filterHisp,
    countryFilter !== "all",
    genreFilter !== "all",
    availFilter !== "all",
  ].filter(Boolean).length;

  const clearFilters = useCallback(() => {
    setSearch("");
    setCountryFilter("all");
    setGenreFilter("all");
    setAvailFilter("all");
    setFilterDir(false);
    setFilterComm(false);
    setFilterNoUSA(false);
    setFilterDoblada(false);
    setFilterHisp(false);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* ── Hero Header ──────────────────────────────────────────── */}
      <header className="relative overflow-hidden border-b border-border/30">
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-800/25 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-rose-900/15 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-zinc-900/50 to-transparent" />

        {/* Decorative film strip dots */}
        <div className="absolute top-4 right-8 flex gap-1.5 opacity-20">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          ))}
        </div>
        <div className="absolute bottom-4 right-8 flex gap-1.5 opacity-20">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          ))}
        </div>

        <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2.5 bg-amber-500/15 rounded-xl border border-amber-500/20 backdrop-blur-sm">
                  <Clapperboard className="h-5 w-5 text-amber-400" />
                </div>
                <Badge
                  variant="outline"
                  className="border-amber-500/25 text-amber-300/80 text-[11px] font-medium tracking-wide"
                >
                  PRESELECCIÓN COLECTIVA
                </Badge>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-3 leading-[1.1]">
                Cineclub Ciudadano
                <span className="text-amber-400/80 text-2xl sm:text-3xl lg:text-4xl font-light ml-2">2026</span>
              </h1>
              <p className="text-zinc-400/90 text-sm sm:text-base max-w-2xl leading-relaxed">
                Esta base de datos reúne todas las películas propuestas en la primera fase del festival. Incluye{" "}
                <span className="text-zinc-200 font-medium">{films.length} títulos</span> diferentes que cumplen los criterios acordados por el grupo de trabajo.
              </p>
            </motion.div>
          </div>
        </div>
      </header>

      {/* ── Main Content ─────────────────────────────────────────── */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8"
        >
          <StatCard icon={Film} label="Total películas" value={stats.total} gradient="from-amber-500/5 to-transparent" />
          <StatCard icon={User} label="Dirigidas por mujer" value={stats.directoras} gradient="from-rose-500/5 to-transparent" />
          <StatCard icon={Globe} label="Países" value={stats.paises} gradient="from-emerald-500/5 to-transparent" />
          <StatCard icon={Tag} label="Géneros" value={stats.generos} gradient="from-violet-500/5 to-transparent" />
          <StatCard icon={Languages} label="Hispanohablantes" value={stats.hispanohablantes} gradient="from-orange-500/5 to-transparent" />
          <StatCard icon={TrendingUp} label="Cine no USA" value={stats.noUSA} gradient="from-sky-500/5 to-transparent" />
        </motion.div>

        {/* Search + Filters bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <div className="relative flex-1 group">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60 group-focus-within:text-primary transition-colors" />
            <Input
              placeholder="Título, director, género o país..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-9 h-10 bg-card border-border/50 focus-visible:border-primary/40 transition-colors"
            />
            {search && (
              <button
                className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded-full hover:bg-muted transition-colors"
                onClick={() => setSearch("")}
                aria-label="Limpiar búsqueda"
              >
                <X className="h-3.5 w-3.5 text-muted-foreground hover:text-foreground" />
              </button>
            )}
          </div>
          <div className="flex gap-2">
            <Button
              variant={showFilters ? "default" : "outline"}
              onClick={() => setShowFilters(!showFilters)}
              className={`h-10 gap-2 ${showFilters ? "shadow-sm" : ""}`}
            >
              <SlidersHorizontal className="h-4 w-4" />
              <span className="hidden sm:inline">Filtros</span>
              {activeFiltersCount > 0 && (
                <span className="bg-primary-foreground text-primary h-5 min-w-5 px-1.5 flex items-center justify-center text-[10px] font-bold rounded-full">
                  {activeFiltersCount}
                </span>
              )}
            </Button>
            {activeFiltersCount > 0 && (
              <Button
                variant="ghost"
                onClick={clearFilters}
                className="h-10 gap-1.5 text-xs text-muted-foreground hover:text-foreground"
              >
                <X className="h-3 w-3" />
                Limpiar
              </Button>
            )}
          </div>
        </div>

        {/* Filter Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <Card className="mb-5 bg-card/80 backdrop-blur-sm border-border/40 shadow-sm">
                <CardContent className="p-5">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
                        País
                      </label>
                      <Select value={countryFilter} onValueChange={setCountryFilter}>
                        <SelectTrigger className="h-9 bg-background/50">
                          <SelectValue placeholder="Todos los países" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Todos los países</SelectItem>
                          {allCountries.map((c) => (
                            <SelectItem key={c} value={c}>
                              {c}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
                        Género
                      </label>
                      <Select value={genreFilter} onValueChange={setGenreFilter}>
                        <SelectTrigger className="h-9 bg-background/50">
                          <SelectValue placeholder="Todos los géneros" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Todos los géneros</SelectItem>
                          {allGenres.map((g) => (
                            <SelectItem key={g} value={g}>
                              {g}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
                        Disponibilidad
                      </label>
                      <Select value={availFilter} onValueChange={setAvailFilter}>
                        <SelectTrigger className="h-9 bg-background/50">
                          <SelectValue placeholder="Todas" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Todas</SelectItem>
                          {allAvailability.map((a) => (
                            <SelectItem key={a} value={a}>
                              {a}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Separator className="mb-4" />
                  <div className="flex flex-wrap gap-2">
                    <FilterPill checked={filterDir} onChange={setFilterDir} label="Dirigida por mujer" />
                    <FilterPill checked={filterComm} onChange={setFilterComm} label="Temática comunitaria" />
                    <FilterPill checked={filterNoUSA} onChange={setFilterNoUSA} label="Cine no USA" />
                    <FilterPill checked={filterDoblada} onChange={setFilterDoblada} label="Doblada" />
                    <FilterPill checked={filterHisp} onChange={setFilterHisp} label="Hispanohablante" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results header */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-muted-foreground">
            {filteredFilms.length === films.length ? (
              <span>
                <span className="font-semibold text-foreground">{films.length}</span> películas
              </span>
            ) : (
              <span>
                <span className="font-semibold text-foreground">{filteredFilms.length}</span> de{" "}
                {films.length} películas
              </span>
            )}
          </p>
          <div className="flex items-center gap-1 bg-muted/50 p-0.5 rounded-lg border border-border/40">
            <button
              onClick={() => setViewMode("table")}
              className={`p-1.5 rounded-md transition-all ${viewMode === "table" ? "bg-card shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}
              aria-label="Vista tabla"
            >
              <LayoutList className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-md transition-all ${viewMode === "grid" ? "bg-card shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}
              aria-label="Vista tarjetas"
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* ── Content Area ────────────────────────────────────────── */}
        {viewMode === "table" ? (
          <Card className="border-border/40 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/30 bg-muted/30">
                    <th className="text-left py-2.5 px-4 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Título
                    </th>
                    <th className="text-left py-2.5 px-4 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground hidden md:table-cell">
                      Dirección
                    </th>
                    <th className="text-left py-2.5 px-4 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground hidden lg:table-cell">
                      País
                    </th>
                    <th className="text-left py-2.5 px-4 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground hidden sm:table-cell">
                      Género
                    </th>
                    <th className="text-left py-2.5 px-4 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground hidden xl:table-cell">
                      Soporte
                    </th>
                    <th className="text-left py-2.5 px-4 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground hidden lg:table-cell">
                      Atributos
                    </th>
                    <th className="w-10" />
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {filteredFilms.map((film, i) => (
                      <FilmRow key={film.id} film={film} index={i} onSelect={setSelectedFilm} />
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
            {filteredFilms.length === 0 && (
              <div className="text-center py-20">
                <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-muted/50 flex items-center justify-center">
                  <Search className="h-6 w-6 text-muted-foreground/40" />
                </div>
                <p className="text-sm font-medium text-foreground/70 mb-1">Sin resultados</p>
                <p className="text-xs text-muted-foreground mb-3">
                  No hay películas que coincidan con los filtros aplicados.
                </p>
                <Button variant="outline" size="sm" onClick={clearFilters} className="text-xs">
                  <X className="h-3 w-3 mr-1" />
                  Limpiar filtros
                </Button>
              </div>
            )}
          </Card>
        ) : (
          <AnimatePresence mode="popLayout">
            {filteredFilms.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredFilms.map((film, i) => (
                  <FilmCardGrid key={film.id} film={film} index={i} onSelect={setSelectedFilm} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-muted/50 flex items-center justify-center">
                  <Search className="h-6 w-6 text-muted-foreground/40" />
                </div>
                <p className="text-sm font-medium text-foreground/70 mb-1">Sin resultados</p>
                <p className="text-xs text-muted-foreground mb-3">
                  No hay películas que coincidan con los filtros aplicados.
                </p>
                <Button variant="outline" size="sm" onClick={clearFilters} className="text-xs">
                  <X className="h-3 w-3 mr-1" />
                  Limpiar filtros
                </Button>
              </div>
            )}
          </AnimatePresence>
        )}
      </main>

      {/* ── Footer ──────────────────────────────────────────────── */}
      <footer className="border-t border-border/30 mt-auto">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Clapperboard className="h-3.5 w-3.5 text-muted-foreground/50" />
            <span className="text-xs text-muted-foreground">
              Grupo de Trabajo de Cineclub
            </span>
          </div>

        </div>
      </footer>

      {/* ── Film Detail Modal ────────────────────────────────────── */}
      <FilmDetail film={selectedFilm} open={!!selectedFilm} onClose={() => setSelectedFilm(null)} />
    </div>
  );
}
