import { Heart, Zap, Dumbbell } from "lucide-react";

export interface Week {
  title: string;
  description: string;
  date: string;
  sessions: Session[];
}

export interface Session {
  type: string;
  icon: any;
  color: string;
  exercises: AnyExercise[];
}

export type AnyExercise = Exercise | IntervalRunning | Tabata;

export interface Exercise {
  name: string;
  duration: string;
  description?: string;
}

export interface IntervalRunning extends Exercise {
  type: "intervals";
  intervals: {
    hard: {
      duration: string;
      description: string;
    };
    easy: {
      duration: string;
      description: string;
    };
    rest?: string;
  };
}

export interface Tabata extends Exercise {
  type: "tabata";
  details: string[];
  rest: string;
}

export const workoutData: Record<number, Week> = {
  1: {
    title: "Semaine 1",
    description: "Base d'endurance et introduction",
    date: "11 - 17 juin",
    sessions: [
      {
        type: "Endurance",
        icon: Heart,
        color: "bg-green-500",
        exercises: [
          {
            name: "Footing en zone 2",
            duration: "45 min",
            description: "Rythme confortable, conversation possible",
          },
        ],
      },
      {
        type: "Seuil",
        icon: Zap,
        color: "bg-orange-500",
        exercises: [
          {
            name: "Échauffement",
            duration: "10 min",
            description: "Footing léger",
          },
          {
            type: "intervals",
            name: "Intervalles",
            duration: "6 répétitions",
            description: "Alternance course intense / course légère",
            intervals: {
              hard: {
                duration: "30 sec",
                description: "Course intense (Zone 5 - à fond)",
              },
              easy: {
                duration: "30 sec",
                description: "Course légère (récupération active)",
              },
              rest: "2 min récup après 3 blocs",
            },
          },
        ],
      },
      {
        type: "Renforcement",
        icon: Dumbbell,
        color: "bg-purple-500",
        exercises: [
          {
            name: "Échauffement",
            duration: "",
            description: "ABC de course (comme en match)",
          },
          {
            type: "tabata",
            name: "Circuit poids du corps",
            duration: "4 tours",
            details: [
              "10 squats jump",
              "10 fentes sautées (par jambe)",
              "30s mountain climbers",
              "45s planche dynamique",
            ],
            rest: "1min récup",
          },
        ],
      },
    ],
  },
  2: {
    title: "Semaine 2",
    description: "Progression et intensité",
    date: "18 - 24 juin",
    sessions: [
      {
        type: "Endurance",
        icon: Heart,
        color: "bg-green-500",
        exercises: [
          {
            name: "Vélo ou footing zone 2",
            duration: "50 min",
            description: "Rythme confortable",
          },
        ],
      },
      {
        type: "Seuil ou Match Amical",
        icon: Zap,
        color: "bg-orange-500",
        exercises: [
          {
            name: "Échauffement",
            duration: "10 min",
            description: "Footing léger",
          },
          {
            name: "Intervalles",
            type: "intervals",
            duration: "6 répétitions",
            description: "Alternance course intense / course légère",
            intervals: {
              hard: {
                duration: "45 sec",
                description: "Course intense (Zone 5 - à fond)",
              },
              easy: {
                duration: "1min30",
                description: "Course légère (récupération active)",
              },
            },
          },
        ],
      },
      {
        type: "Renforcement",
        icon: Dumbbell,
        color: "bg-purple-500",
        exercises: [
          {
            name: "Échauffement",
            duration: "10 min",
            description: "Footing léger",
          },
          {
            name: "Circuit",
            duration: "4 tours",
            rest: "1min récup",
            details: [
              "5 sprints 10 m",
              "10 fentes bulgares avec saut",
              "10 fentes sautées",
              "1min squat hold",
            ],
          },
        ],
      },
    ],
  },
  3: {
    title: "Semaine 3",
    description: "Montée en charge",
    date: "25 juin - 1er juillet",
    sessions: [
      {
        type: "Endurance",
        icon: Heart,
        color: "bg-green-500",
        exercises: [
          {
            name: "Footing vallonné (Zone 2)",
            duration: "55 min",
            description:
              "Terrain avec un peu de dénivelé, rythme conversationnel",
          },
        ],
      },
      {
        type: "Seuil",
        icon: Zap,
        color: "bg-orange-500",
        exercises: [
          {
            name: "Échauffement",
            duration: "12 min",
            description: "Footing + ABC de course (comme en match)",
          },
          {
            name: "Intervalles 30/30",
            duration: "8 répétitions",
            description: "Course intense / course lente",
            intervals: {
              hard: {
                duration: "30 sec",
                description: "Course en zone 5",
              },
              easy: {
                duration: "30 sec",
                description: "Course très lente ou marche active",
              },
              rest: "2 min après 4 répétitions",
            },
          },
        ],
      },
      {
        type: "Renforcement",
        icon: Dumbbell,
        color: "bg-purple-500",
        exercises: [
          {
            name: "Échauffement",
            duration: "10 min",
            description: "ABC de course",
          },
          {
            type: "tabata",
            name: "Circuit explosivité",
            duration: "4 tours",
            rest: "1min30 récup",
            details: [
              "8 squats sautés",
              "12 fentes latérales dynamiques (par côté)",
              "6 burpees avec saut haut",
            ],
          },
          {
            type: "tabata",
            name: "Gainage",
            duration: "3 tours",
            rest: "30s récup",
            details: [
              "45s gainage latéral dynamique",
              "45s superman assymétrique (bras et jambe opposée qui se lèvent",
              "Exercice d'abdo jusqu'à sensation de brûlure (exercice différent par tour)",
            ],
          },
        ],
      },
    ],
  },
  4: {
    title: "Semaine 4",
    description: "Pyramide",
    date: "2 - 8 juillet",
    sessions: [
      {
        type: "Endurance",
        icon: Heart,
        color: "bg-green-500",
        exercises: [
          {
            name: "Footing ou vélo Zone 2",
            duration: "55 min",
            description: "Sortie longue à allure constante, rythme facile",
          },
          {
            name: "Gainage statique ventral + latéral",
            duration: "5 min",
            description:
              "Alterner ventral, latéral et pause. 5 minute de position gainage",
          },
        ],
      },
      {
        type: "Seuil",
        icon: Zap,
        color: "bg-orange-500",
        exercises: [
          {
            name: "Échauffement",
            duration: "12 min",
            description: "Footing léger + exercices de mobilité",
          },
          {
            name: "Pyramide",
            duration: "1 tour",
            description: `Sprints, 1min de pause entre chaque sprint:
              100m, 200m, 400m, 400m, 200m, 100m`,
          },
          {
            name: "Gainage",
            duration: "3 tours",
            rest: "30s récup",
            details: [
              "45s gainage ventral dynamique",
              "30s gainage latéral dynamique",
              "45s de ponts fessiers dynamique (descendre le plus bas possible et remonter)",
            ],
          },
        ],
      },
      {
        type: "Renforcement",
        icon: Dumbbell,
        color: "bg-purple-500",
        exercises: [
          {
            name: "Échauffement",
            duration: "10 min",
            description:
              "ABC + activation bas du corps (battements jambes, sauts sur place)",
          },
          {
            name: "Circuit pliométrique",
            duration: "4 tours",
            rest: "1min30 récup",
            details: [
              "5 bonds horizontaux explosifs",
              "10 sauts pieds joints latéraux",
              "30s step-up sautés (par jambe)",
              "30s burpees",
            ],
          },
        ],
      },
    ],
  },
};
