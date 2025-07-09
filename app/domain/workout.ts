import {Dumbbell, Heart, Zap} from "lucide-react";

export interface Week {
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  sessions: Session[];
}

export interface Session {
  type: string;
  icon: any; // eslint-disable-line
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
    startDate: new Date(2025, 5, 11), // June 11, 2025
    endDate: new Date(2025, 5, 17), // June 17, 2025
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
    startDate: new Date(2025, 5, 18), // June 18, 2025
    endDate: new Date(2025, 5, 24), // June 24, 2025
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
    startDate: new Date(2025, 5, 25), // June 25, 2025
    endDate: new Date(2025, 6, 1), // July 1, 2025
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
    startDate: new Date(2025, 6, 2), // July 2, 2025
    endDate: new Date(2025, 6, 8), // July 8, 2025
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
  5: {
    title: 'Semaine 5',
    description: 'Récupération active',
    startDate: new Date(2025, 6, 9), // July 9, 2025
    endDate: new Date(2025, 6, 15), // July 15, 2025
    sessions: [
      {
        type: 'Endurance',
        icon: Heart,
        color: 'bg-green-500',
        exercises: [
          {
            name: 'Easy run (Zone 1-2)',
            duration: '45 min',
            description: 'Course à très faible intensité, rythme très facile',
          },
        ],
      },
      {
        type: 'Endurance',
        icon: Zap,
        color: 'bg-orange-500',
        exercises: [
          {
            name: 'Footing tempo (Zone 3)',
            duration: '35 min',
            description: 'Course continue à intensité modérée, maintien d’un bon rythme',
          },
        ],
      },
      {
        type: 'Renforcement',
        icon: Dumbbell,
        color: 'bg-purple-500',
        exercises: [
          {
            name: 'Circuit renfo gainage & jambes',
            duration: '3 tours',
            description: 'Travail contrôlé, sans explosivité',
            type: 'tabata',
            rest: '1min récup',
            details: [
              '45s chaise contre un mur',
              '45s gainage ventral',
              '30s squats lents',
              '45s gainage latéral (droite)',
              '45s gainage latéral (gauche)',
              '30s pont fessier au sol',
            ],
          },
        ],
      },
    ],
  },
  6: {
    title: 'Semaine 6',
    description: 'Montée en intensité',
    startDate: new Date(2025, 6, 16), // July 16, 2025
    endDate: new Date(2025, 6, 22), // July 22, 2025
    sessions: [
      {
        type: 'Endurance',
        icon: Heart,
        color: 'bg-green-500',
        exercises: [
          {
            name: 'Footing vallonné (Zone 2)',
            duration: '60 min',
            description: 'Sortie longue avec un peu de dénivelé, rythme conversationnel',
          },
        ],
      },
      {
        type: 'Seuil',
        icon: Zap,
        color: 'bg-orange-500',
        exercises: [
          {
            name: 'Échauffement',
            duration: '12 min',
            description: 'Footing + mobilisation articulaire',
          },
          {
            type: 'intervals',
            name: 'Intervalles 60/120',
            duration: '6 répétitions',
            description: 'Effort long, récupération active',
            intervals: {
              hard: {
                duration: '60 sec',
                description: 'Course en zone 4-5, maintien d’un tempo intense',
              },
              easy: {
                duration: '120 sec',
                description: 'Marche ou footing très léger',
              },
              rest: '2 min entre les blocs de 3 répétitions',
            },
          },
          {
            name: 'Retour au calme',
            duration: '5 min',
            description: 'Marche + respiration contrôlée',
          },
        ],
      },
      {
        type: 'Renforcement',
        icon: Dumbbell,
        color: 'bg-purple-500',
        exercises: [
          {
            name: 'Échauffement actif',
            duration: '10 min',
            description: 'Sauts sur place, mobilisations, fentes dynamiques',
          },
          {
            type: 'tabata',
            name: 'Circuit explosivité',
            duration: '4 tours',
            rest: '1min30 récup',
            details: [
              '20s squats sautés',
              '30s fentes sautées (alternées)',
              '30s burpees',
              '30s squats bulgares sautés',
            ],
          },
          {
            type: 'tabata',
            name: 'Gainage dynamique',
            duration: '3 tours',
            rest: '1m récup',
            details: [
              '30s gainage planche dynamique',
              '30s mountain climbers',
              '30s superman',
              '30s pont fessier au sol',
            ],
          },
        ],
      },
    ],
  },
};
