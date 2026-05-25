"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Film,
  Search,
  Filter,
  X,
  Globe,
  CheckCircle2,
  XCircle,
  Clapperboard,
  Star,
  ChevronRight,
  Disc3,
  Download,
  Languages,
  User,
  MapPin,
  Tag,
  Info,
  Award,
} from "lucide-react";
import { films, allCountries, allGenres, allAvailability, Film as FilmType } from "@/data/films";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

// ─── Stat Card Component ────────────────────────────────────────────
function StatCard({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: React.ElementType;
  label: string;
  value: number | string;
  color: string;
}) {
  return (
    <Card className="bg-card/80 backdrop-blur-sm border-border/50">
      <CardContent className="p-4 flex items-center gap-3">
        <div className={`p-2 rounded-lg ${color}`}>
          <Icon className="h-4 w-4 text-white" />
        </div>
        <div>
          <p className="text-2xl font-bold leading-none">{value}</p>
          <p className="text-xs text-muted-foreground mt-1">{label}</p>
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Boolean Badge ──────────────────────────────────────────────────
function BoolBadge({ value, label }: { value: boolean; label: string }) {
  return value ? (
    <Badge variant="default" className="bg-emerald-600/90 text-white text-xs gap-1">
      <CheckCircle2 className="h-3 w-3" />
      {label}
    </Badge>
  ) : (
    <Badge variant="secondary" className="text-xs gap-1 opacity-60">
      <XCircle className="h-3 w-3" />
      {label}
    </Badge>
  );
}

// ─── Film Row (for table view) ─────────────────────────────────────
function FilmRow({
  film,
  onSelect,
}: {
  film: FilmType;
  onSelect: (film: FilmType) => void;
}) {
  const availIcon =
    film.disponibilidad === "Blu ray" ? (
      <Disc3 className="h-3.5 w-3.5 text-blue-400" />
    ) : film.disponibilidad === "DVD" ? (
      <Disc3 className="h-3.5 w-3.5 text-amber-400" />
    ) : (
      <Download className="h-3.5 w-3.5 text-green-400" />
    );

  return (
    <motion.tr
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="border-b border-border/30 hover:bg-muted/50 transition-colors cursor-pointer group"
      onClick={() => onSelect(film)}
    >
      <td className="py-2.5 px-3">
        <span className="font-medium text-sm group-hover:text-primary transition-colors">
          {film.titulo}
        </span>
      </td>
      <td className="py-2.5 px-3 text-sm text-muted-foreground hidden md:table-cell">
        {film.direccion}
      </td>
      <td className="py-2.5 px-3 text-sm hidden lg:table-cell">
        <Badge variant="outline" className="text-xs font-normal gap-1">
          <MapPin className="h-3 w-3" />
          {film.pais}
        </Badge>
      </td>
      <td className="py-2.5 px-3 hidden sm:table-cell">
        <Badge variant="outline" className="text-xs font-normal gap-1">
          <Tag className="h-3 w-3" />
          {film.genero}
        </Badge>
      </td>
      <td className="py-2.5 px-3 hidden xl:table-cell">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          {availIcon}
          <span>{film.disponibilidad}</span>
        </div>
      </td>
      <td className="py-2.5 px-3 hidden lg:table-cell">
        <div className="flex gap-1">
          {film.directora && (
            <Badge className="bg-rose-500/90 text-white text-[10px] px-1.5 py-0">
              Dira.
            </Badge>
          )}
          {film.hispanohablante && (
            <Badge className="bg-orange-500/90 text-white text-[10px] px-1.5 py-0">
              ES
            </Badge>
          )}
          {film.doblada && (
            <Badge className="bg-sky-500/90 text-white text-[10px] px-1.5 py-0">
              Dob.
            </Badge>
          )}
        </div>
      </td>
      <td className="py-2.5 px-3 text-right">
        <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors ml-auto" />
      </td>
    </motion.tr>
  );
}

// ─── Film Card (for grid view) ─────────────────────────────────────
function FilmCardGrid({
  film,
  onSelect,
}: {
  film: FilmType;
  onSelect: (film: FilmType) => void;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <Card
        className="bg-card/80 backdrop-blur-sm border-border/50 hover:border-primary/40 transition-all cursor-pointer group h-full"
        onClick={() => onSelect(film)}
      >
        <CardHeader className="pb-2 pt-4 px-4">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-sm font-semibold leading-tight group-hover:text-primary transition-colors">
              {film.titulo}
            </CardTitle>
            <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5 group-hover:text-primary transition-colors" />
          </div>
          <p className="text-xs text-muted-foreground">{film.direccion}</p>
        </CardHeader>
        <CardContent className="px-4 pb-4 flex flex-col gap-2">
          <div className="flex flex-wrap gap-1">
            <Badge variant="outline" className="text-[10px] font-normal gap-1">
              <MapPin className="h-2.5 w-2.5" />
              {film.pais}
            </Badge>
            <Badge variant="outline" className="text-[10px] font-normal gap-1">
              <Tag className="h-2.5 w-2.5" />
              {film.genero}
            </Badge>
          </div>
          <div className="flex flex-wrap gap-1">
            {film.directora && (
              <Badge className="bg-rose-500/90 text-white text-[10px] px-1.5 py-0">
                Directora
              </Badge>
            )}
            {film.hispanohablante && (
              <Badge className="bg-orange-500/90 text-white text-[10px] px-1.5 py-0">
                Hispanohablante
              </Badge>
            )}
            {film.doblada && (
              <Badge className="bg-sky-500/90 text-white text-[10px] px-1.5 py-0">
                Doblada
              </Badge>
            )}
            {!film.cineNoUSA && (
              <Badge className="bg-violet-500/90 text-white text-[10px] px-1.5 py-0">
                Cine USA
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
            {film.disponibilidad === "Blu ray" ? (
              <Disc3 className="h-3 w-3 text-blue-400" />
            ) : film.disponibilidad === "DVD" ? (
              <Disc3 className="h-3 w-3 text-amber-400" />
            ) : (
              <Download className="h-3 w-3 text-green-400" />
            )}
            <span>{film.disponibilidad}</span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// ─── Film Detail Modal ─────────────────────────────────────────────
function FilmDetail({ film, open, onClose }: { film: FilmType | null; open: boolean; onClose: () => void }) {
  if (!film) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden p-0">
        <ScrollArea className="max-h-[90vh]">
          <div className="p-6">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold pr-8">{film.titulo}</DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">
                Dirigida por {film.direccion} — {film.pais}
              </DialogDescription>
            </DialogHeader>

            <div className="mt-5 space-y-5">
              {/* Genre and Availability Row */}
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-primary/90 text-primary-foreground gap-1">
                  <Clapperboard className="h-3 w-3" />
                  {film.genero}
                </Badge>
                <Badge variant="outline" className="gap-1">
                  {film.disponibilidad === "Blu ray" ? (
                    <Disc3 className="h-3 w-3 text-blue-500" />
                  ) : film.disponibilidad === "DVD" ? (
                    <Disc3 className="h-3 w-3 text-amber-500" />
                  ) : (
                    <Download className="h-3 w-3 text-green-500" />
                  )}
                  {film.disponibilidad}
                </Badge>
              </div>

              {/* Attributes Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded bg-muted">
                    <User className="h-3.5 w-3.5 text-muted-foreground" />
                  </div>
                  <span className="text-xs">
                    {film.directora ? "Dirigida por mujer" : "Dirigida por hombre"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded bg-muted">
                    <Languages className="h-3.5 w-3.5 text-muted-foreground" />
                  </div>
                  <span className="text-xs">
                    {film.hispanohablante ? "Hispanohablante" : "Subtitulada"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded bg-muted">
                    <Globe className="h-3.5 w-3.5 text-muted-foreground" />
                  </div>
                  <span className="text-xs">
                    {film.cineNoUSA ? "Cine no USA" : "Cine USA"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded bg-muted">
                    <Star className="h-3.5 w-3.5 text-muted-foreground" />
                  </div>
                  <span className="text-xs">
                    {film.tComunitaria ? "Temática comunitaria" : "Temática individual"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded bg-muted">
                    <Info className="h-3.5 w-3.5 text-muted-foreground" />
                  </div>
                  <span className="text-xs">{film.doblada ? "Doblada" : "Subtitulada"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded bg-muted">
                    <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                  </div>
                  <span className="text-xs">{film.pais}</span>
                </div>
              </div>

              <Separator />

              {/* Description */}
              <div>
                <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
                  <Film className="h-4 w-4 text-primary" />
                  Sinopsis
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {film.descripcion}
                </p>
              </div>

              <Separator />

              {/* Importance */}
              <div>
                <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
                  <Award className="h-4 w-4 text-amber-500" />
                  Importancia cinematográfica
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {film.importancia}
                </p>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────
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

  // Stats
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

  const activeFiltersCount = [filterDir, filterComm, filterNoUSA, filterDoblada, filterHisp, countryFilter !== "all", genreFilter !== "all", availFilter !== "all"].filter(Boolean).length;

  const clearFilters = () => {
    setSearch("");
    setCountryFilter("all");
    setGenreFilter("all");
    setAvailFilter("all");
    setFilterDir(false);
    setFilterComm(false);
    setFilterNoUSA(false);
    setFilterDoblada(false);
    setFilterHisp(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Header */}
      <header className="relative overflow-hidden border-b border-border/50">
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-900/20 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-rose-900/10 via-transparent to-transparent" />
        <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-amber-500/20 rounded-xl border border-amber-500/30">
                <Clapperboard className="h-6 w-6 text-amber-400" />
              </div>
              <Badge variant="outline" className="border-amber-500/30 text-amber-300 text-xs">
                Base de Datos
              </Badge>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-3">
              Cineclub
            </h1>
            <p className="text-zinc-400 text-base sm:text-lg max-w-xl leading-relaxed">
              Colección curada de {films.length} películas de cine de autor, documentales y obras
              fundamentales del cine mundial. Haz clic en cualquier película para ver su ficha completa.
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
          <StatCard icon={Film} label="Total películas" value={stats.total} color="bg-zinc-800" />
          <StatCard
            icon={User}
            label="Dirigidas por mujer"
            value={stats.directoras}
            color="bg-rose-600"
          />
          <StatCard icon={Globe} label="Países" value={stats.paises} color="bg-emerald-600" />
          <StatCard icon={Tag} label="Géneros" value={stats.generos} color="bg-amber-600" />
          <StatCard
            icon={Languages}
            label="Hispanohablantes"
            value={stats.hispanohablantes}
            color="bg-orange-600"
          />
          <StatCard
            icon={Globe}
            label="Cine no USA"
            value={stats.noUSA}
            color="bg-sky-600"
          />
        </div>

        {/* Search and Filters Bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por título, director, género o país..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-10"
            />
            {search && (
              <button
                className="absolute right-3 top-1/2 -translate-y-1/2"
                onClick={() => setSearch("")}
              >
                <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
              </button>
            )}
          </div>
          <div className="flex gap-2">
            <Button
              variant={showFilters ? "default" : "outline"}
              onClick={() => setShowFilters(!showFilters)}
              className="h-10 gap-2"
            >
              <Filter className="h-4 w-4" />
              Filtros
              {activeFiltersCount > 0 && (
                <Badge className="bg-primary text-primary-foreground h-5 w-5 p-0 flex items-center justify-center text-[10px] rounded-full">
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
            {activeFiltersCount > 0 && (
              <Button variant="ghost" onClick={clearFilters} className="h-10 gap-1 text-xs">
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
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <Card className="mb-6 border-border/50">
                <CardContent className="p-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    <div className="space-y-1.5">
                      <Label className="text-xs font-medium text-muted-foreground">País</Label>
                      <Select value={countryFilter} onValueChange={setCountryFilter}>
                        <SelectTrigger className="h-9">
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
                      <Label className="text-xs font-medium text-muted-foreground">Género</Label>
                      <Select value={genreFilter} onValueChange={setGenreFilter}>
                        <SelectTrigger className="h-9">
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
                      <Label className="text-xs font-medium text-muted-foreground">Disponibilidad</Label>
                      <Select value={availFilter} onValueChange={setAvailFilter}>
                        <SelectTrigger className="h-9">
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
                  <Separator className="my-4" />
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                    <div className="flex items-center gap-2">
                      <Checkbox id="f-dir" checked={filterDir} onCheckedChange={(v) => setFilterDir(!!v)} />
                      <Label htmlFor="f-dir" className="text-xs cursor-pointer">
                        Dirigida por mujer
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="f-comm"
                        checked={filterComm}
                        onCheckedChange={(v) => setFilterComm(!!v)}
                      />
                      <Label htmlFor="f-comm" className="text-xs cursor-pointer">
                        Temática comunitaria
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="f-nousa"
                        checked={filterNoUSA}
                        onCheckedChange={(v) => setFilterNoUSA(!!v)}
                      />
                      <Label htmlFor="f-nousa" className="text-xs cursor-pointer">
                        Cine no USA
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="f-dob"
                        checked={filterDoblada}
                        onCheckedChange={(v) => setFilterDoblada(!!v)}
                      />
                      <Label htmlFor="f-dob" className="text-xs cursor-pointer">
                        Doblada
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="f-hisp"
                        checked={filterHisp}
                        onCheckedChange={(v) => setFilterHisp(!!v)}
                      />
                      <Label htmlFor="f-hisp" className="text-xs cursor-pointer">
                        Hispanohablante
                      </Label>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results count and view toggle */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">{filteredFilms.length}</span> de{" "}
            {films.length} películas
          </p>
          <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as "table" | "grid")}>
            <TabsList className="h-8">
              <TabsTrigger value="table" className="text-xs px-3 h-7">
                Tabla
              </TabsTrigger>
              <TabsTrigger value="grid" className="text-xs px-3 h-7">
                Tarjetas
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Content */}
        {viewMode === "table" ? (
          <Card className="border-border/50 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/50 bg-muted/30">
                    <th className="text-left py-2.5 px-3 text-xs font-medium text-muted-foreground">
                      Título
                    </th>
                    <th className="text-left py-2.5 px-3 text-xs font-medium text-muted-foreground hidden md:table-cell">
                      Dirección
                    </th>
                    <th className="text-left py-2.5 px-3 text-xs font-medium text-muted-foreground hidden lg:table-cell">
                      País
                    </th>
                    <th className="text-left py-2.5 px-3 text-xs font-medium text-muted-foreground hidden sm:table-cell">
                      Género
                    </th>
                    <th className="text-left py-2.5 px-3 text-xs font-medium text-muted-foreground hidden xl:table-cell">
                      Disponibilidad
                    </th>
                    <th className="text-left py-2.5 px-3 text-xs font-medium text-muted-foreground hidden lg:table-cell">
                      Tags
                    </th>
                    <th className="w-8"></th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {filteredFilms.map((film) => (
                      <FilmRow key={film.id} film={film} onSelect={setSelectedFilm} />
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
            {filteredFilms.length === 0 && (
              <div className="text-center py-16 text-muted-foreground">
                <Search className="h-10 w-10 mx-auto mb-3 opacity-30" />
                <p className="text-sm">No se encontraron películas con los filtros aplicados.</p>
                <Button variant="link" onClick={clearFilters} className="text-xs mt-1">
                  Limpiar filtros
                </Button>
              </div>
            )}
          </Card>
        ) : (
          <div>
            <AnimatePresence mode="popLayout">
              {filteredFilms.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredFilms.map((film) => (
                    <FilmCardGrid key={film.id} film={film} onSelect={setSelectedFilm} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 text-muted-foreground">
                  <Search className="h-10 w-10 mx-auto mb-3 opacity-30" />
                  <p className="text-sm">No se encontraron películas con los filtros aplicados.</p>
                  <Button variant="link" onClick={clearFilters} className="text-xs mt-1">
                    Limpiar filtros
                  </Button>
                </div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-12 pb-8 text-center">
          <Separator className="mb-6" />
          <p className="text-xs text-muted-foreground">
            Cineclub — Base de datos de cine de autor. {films.length} películas de {allCountries.length} países.
          </p>
        </footer>
      </main>

      {/* Film Detail Modal */}
      <FilmDetail film={selectedFilm} open={!!selectedFilm} onClose={() => setSelectedFilm(null)} />
    </div>
  );
}
