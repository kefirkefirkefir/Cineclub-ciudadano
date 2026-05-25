import {
  Zap,
  Heart,
  BookOpen,
  Camera,
  Users,
} from "lucide-react";
import type { JuryKey } from "./scoring";

export const juryIcons: Record<JuryKey, React.ElementType> = {
  jovenes: Zap,
  mayores: Heart,
  cultural: BookOpen,
  instagram: Camera,
  socios: Users,
};

export const juryColorClasses: Record<
  JuryKey,
  { bg: string; border: string; badge: string; dot: string; text: string; hover: string }
> = {
  jovenes: {
    bg: "bg-blue-50/80 dark:bg-blue-950/40",
    border: "border-blue-200/60 dark:border-blue-800/40",
    badge: "bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-300",
    dot: "bg-blue-500",
    text: "text-blue-700 dark:text-blue-300",
    hover: "hover:bg-blue-100/80 dark:hover:bg-blue-900/60",
  },
  mayores: {
    bg: "bg-amber-50/80 dark:bg-amber-950/40",
    border: "border-amber-200/60 dark:border-amber-800/40",
    badge: "bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-300",
    dot: "bg-amber-500",
    text: "text-amber-700 dark:text-amber-300",
    hover: "hover:bg-amber-100/80 dark:hover:bg-amber-900/60",
  },
  cultural: {
    bg: "bg-emerald-50/80 dark:bg-emerald-950/40",
    border: "border-emerald-200/60 dark:border-emerald-800/40",
    badge: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300",
    dot: "bg-emerald-500",
    text: "text-emerald-700 dark:text-emerald-300",
    hover: "hover:bg-emerald-100/80 dark:hover:bg-emerald-900/60",
  },
  instagram: {
    bg: "bg-violet-50/80 dark:bg-violet-950/40",
    border: "border-violet-200/60 dark:border-violet-800/40",
    badge: "bg-violet-100 text-violet-800 dark:bg-violet-900/60 dark:text-violet-300",
    dot: "bg-violet-500",
    text: "text-violet-700 dark:text-violet-300",
    hover: "hover:bg-violet-100/80 dark:hover:bg-violet-900/60",
  },
  socios: {
    bg: "bg-orange-50/80 dark:bg-orange-950/40",
    border: "border-orange-200/60 dark:border-orange-800/40",
    badge: "bg-orange-100 text-orange-800 dark:bg-orange-900/60 dark:text-orange-300",
    dot: "bg-orange-500",
    text: "text-orange-700 dark:text-orange-300",
    hover: "hover:bg-orange-100/80 dark:hover:bg-orange-900/60",
  },
};
