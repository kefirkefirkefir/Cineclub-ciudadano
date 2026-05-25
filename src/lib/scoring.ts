import { Film } from "@/data/films";

// ─── Jury definitions ──────────────────────────────────────────
export const JURIES = [
  {
    key: "jovenes",
    label: "Asociaciones Jóvenes",
    shortLabel: "Jóvenes",
    icon: "zap",
    color: "blue",
    description: "Público joven, dinámico y visual",
  },
  {
    key: "mayores",
    label: "Asociaciones Mayores",
    shortLabel: "Mayores",
    icon: "heart",
    color: "amber",
    description: "Personas mayores, accesibilidad prioritaria",
  },
  {
    key: "cultural",
    label: "Culturales / Sociales",
    shortLabel: "Cultural",
    icon: "book-open",
    color: "emerald",
    description: "Sensibilidad cultural y compromiso social",
  },
  {
    key: "instagram",
    label: "Seguidores Instagram",
    shortLabel: "Instagram",
    icon: "camera",
    color: "violet",
    description: "Audiencia digital, contenido compartible",
  },
  {
    key: "socios",
    label: "Socios WhatsApp",
    shortLabel: "Socies",
    icon: "users",
    color: "orange",
    description: "Esencia de La Quimera",
  },
] as const;

export type JuryKey = (typeof JURIES)[number]["key"];

// ─── Scoring rules ─────────────────────────────────────────────
// Each jury has genre keyword scores and boolean field scores.
// Genre matching uses case-insensitive partial string matching.
// Boolean scores add points when the film property is true.

interface ScoringRule {
  genreKeywords: [string, number][]; // [keyword, points]
  fieldScores: Partial<Record<keyof Pick<Film, "hispanohablante" | "doblada" | "tComunitaria" | "cineNoUSA" | "directora">, number>>;
}

const juryScoring: Record<JuryKey, ScoringRule> = {
  jovenes: {
    genreKeywords: [
      ["animación", 3],
      ["ciencia ficción", 3],
      ["comedia musical juvenil", 3],
      ["thriller", 2],
      ["horror", 2],
      ["musical", 2],
      ["western", 1],
      ["fantástico", 1],
      ["fantasía", 1],
      ["comedia", 1],
      ["road movie", 1],
    ],
    fieldScores: { cineNoUSA: 1 },
  },
  mayores: {
    genreKeywords: [
      ["drama familiar", 2],
      ["drama histórico", 2],
      ["documental", 1],
      ["comedia dramática", 1],
      ["musical", 1],
    ],
    fieldScores: { hispanohablante: 5, doblada: 4, tComunitaria: 2, cineNoUSA: 1 },
  },
  cultural: {
    genreKeywords: [
      ["documental", 3],
      ["drama bélico", 2],
      ["drama histórico", 2],
      ["vanguardia", 1],
      ["contemplativo", 1],
    ],
    fieldScores: { tComunitaria: 3, cineNoUSA: 2, directora: 1 },
  },
  instagram: {
    genreKeywords: [
      ["ciencia ficción", 3],
      ["animación", 3],
      ["thriller", 2],
      ["horror", 2],
      ["musical", 2],
      ["western", 1],
      ["fantástico", 1],
      ["fantasía", 1],
      ["road movie", 1],
    ],
    fieldScores: { cineNoUSA: 1 },
  },
  socios: {
    genreKeywords: [
      ["comedia dramática", 2],
      ["documental", 1],
      ["drama familiar", 1],
      ["musical", 1],
    ],
    fieldScores: { hispanohablante: 2, doblada: 1, tComunitaria: 1 },
  },
};

// ─── Score calculation ─────────────────────────────────────────
function scoreFilmForJury(film: Film, juryKey: JuryKey): number {
  const rules = juryScoring[juryKey];
  let score = 0;

  const genreLower = film.genero.toLowerCase();

  // Genre keyword matching
  for (const [keyword, points] of rules.genreKeywords) {
    if (genreLower.includes(keyword.toLowerCase())) {
      score += points;
    }
  }

  // Boolean field scores
  for (const [field, points] of Object.entries(rules.fieldScores)) {
    if (points && film[field as keyof Film]) {
      score += points;
    }
  }

  return score;
}

export interface JuryScore {
  filmId: number;
  score: number;
}

// ─── Public API ────────────────────────────────────────────────

/** Score every film for every jury. Returns a map: juryKey -> [{filmId, score}] */
export function scoreAllFilms(
  films: Film[]
): Record<JuryKey, JuryScore[]> {
  const result: Record<JuryKey, JuryScore[]> = {
    jovenes: [],
    mayores: [],
    cultural: [],
    instagram: [],
    socios: [],
  };

  for (const film of films) {
    for (const jury of JURIES) {
      const score = scoreFilmForJury(film, jury.key);
      if (score > 0) {
        result[jury.key].push({ filmId: film.id, score });
      }
    }
  }

  // Sort each jury by score descending
  for (const key of Object.keys(result) as JuryKey[]) {
    result[key].sort((a, b) => b.score - a.score);
  }

  return result;
}

/** Forced assignments: films that must always go to a specific jury.
 *  These override any automatic scoring. */
const FORCED_ASSIGNMENTS: Partial<Record<number, JuryKey>> = {
  24: "socios", // La Quimera -> Socios
};

/** Auto-assign 5 films per jury, randomly selected from top candidates.
 *  Returns a map: filmId -> juryKey */
export function autoAssign(
  films: Film[],
  existingAssignments: Record<number, string>,
  count: number = 5
): Record<number, string> {
  const alreadyAssigned = new Set(
    Object.keys(existingAssignments).map(Number)
  );
  const scores = scoreAllFilms(films);
  const newAssignments: Record<number, string> = { ...existingAssignments };

  // Count how many forced assignments already exist per jury
  const forcedCount: Record<string, number> = {};
  for (const jury of JURIES) forcedCount[jury.key] = 0;
  for (const [filmId, juryKey] of Object.entries(FORCED_ASSIGNMENTS)) {
    const id = Number(filmId);
    if (!alreadyAssigned.has(id)) {
      newAssignments[id] = juryKey;
      alreadyAssigned.add(id);
      forcedCount[juryKey]++;
    }
  }

  // Then, auto-assign the rest
  for (const jury of JURIES) {
    // Adjust count: subtract films already forced into this jury
    const remaining = count - forcedCount[jury.key];
    if (remaining <= 0) continue;
    const candidates = scores[jury.key].filter(
      (s) => !alreadyAssigned.has(s.filmId)
    );

    // Pick `count` films from top candidates (top 10 if available, then random)
    const pool = candidates.slice(0, Math.max(remaining * 2, 10));
    // Shuffle and take `remaining`
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, remaining);

    for (const s of selected) {
      newAssignments[s.filmId] = jury.key;
      alreadyAssigned.add(s.filmId);
    }
  }

  return newAssignments;
}
