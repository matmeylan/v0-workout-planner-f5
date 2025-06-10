import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Heart, Zap, Dumbbell, Clock, Repeat, Play, Pause } from "lucide-react"
import type { Metadata } from "next"

const workoutData = {
  1: {
    title: "Semaine 1",
    sessions: [
      {
        type: "Endurance",
        icon: Heart,
        color: "bg-green-500",
        exercises: [
          { name: "Footing en zone 2", duration: "45 min", description: "Rythme confortable, conversation possible" },
        ],
      },
      {
        type: "Seuil",
        icon: Zap,
        color: "bg-orange-500",
        exercises: [
          { name: "Échauffement", duration: "10 min", description: "Footing léger" },
          {
            name: "Intervalles",
            duration: "6 répétitions",
            description: "Alternance course intense / course légère",
            intervals: {
              hard: { duration: "30 sec", description: "Course intense (Zone 5 - à fond)" },
              easy: { duration: "30 sec", description: "Course légère (récupération active)" },
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
          { name: "Échauffement", duration: "", description: "ABC de course (comme en match)" },
          {
            name: "Circuit poids du corps",
            duration: "4 tours",
            rest: "1min récup",
            details: [
              "10 squats jump",
              "10 fentes sautées (par jambe)",
              "30s mountain climbers",
              "45s planche dynamique",
            ],
          },
        ],
      },
    ],
  },
  2: {
    title: "Semaine 2",
    sessions: [
      {
        type: "Endurance",
        icon: Heart,
        color: "bg-green-500",
        exercises: [{ name: "Vélo ou footing zone 2", duration: "50 min", description: "Rythme confortable" }],
      },
      {
        type: "Seuil ou Match Amical",
        icon: Zap,
        color: "bg-orange-500",
        exercises: [
          { name: "Échauffement", duration: "10 min", description: "Footing léger" },
          {
            name: "Intervalles",
            duration: "6 répétitions",
            description: "Alternance course intense / course légère",
            intervals: {
              hard: { duration: "45 sec", description: "Course intense (Zone 5 - à fond)" },
              easy: { duration: "1min30", description: "Course légère (récupération active)" },
            },
          },
        ],
      },
      {
        type: "Renforcement",
        icon: Dumbbell,
        color: "bg-purple-500",
        exercises: [
          { name: "Échauffement", duration: "10 min", description: "Footing léger" },
          {
            name: "Circuit",
            duration: "4 tours",
            rest: "1min récup",
            details: ["5 sprints 10 m", "10 fentes bulgares avec saut", "10 fentes sautées", "1min squat hold"],
          },
        ],
      },
    ],
  },
}

export default function WeekPage({ params }: { params: { number: string } }) {
  const weekNumber = Number.parseInt(params.number)
  const week = workoutData[weekNumber as keyof typeof workoutData]

  if (!week) {
    return <div>Semaine non trouvée</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-md mx-auto">
        <div className="flex items-center mb-6 pt-4">
          <Link href="/" className="mr-4">
            <ArrowLeft className="h-6 w-6 text-gray-600 hover:text-gray-900" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">{week.title}</h1>
        </div>

        <div className="space-y-6">
          {week.sessions.map((session, index) => {
            const IconComponent = session.icon
            return (
              <Card key={index} className="border-2">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center">
                    <div className={`p-2 rounded-full ${session.color} mr-3`}>
                      <IconComponent className="h-4 w-4 text-white" />
                    </div>
                    <span>{session.type}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {session.exercises.map((exercise, exerciseIndex) => (
                    <div key={exerciseIndex} className="border-l-4 border-gray-200 pl-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-900">{exercise.name}</h4>
                        {exercise.duration && (
                          <Badge variant="secondary" className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {exercise.duration}
                          </Badge>
                        )}
                      </div>

                      {exercise.description && <p className="text-sm text-gray-600 mb-2">{exercise.description}</p>}

                      {/* Special interval display for Seuil workouts */}
                      {exercise.intervals && (
                        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mt-3">
                          <div className="grid grid-cols-2 gap-3 mb-3">
                            <div className="bg-red-100 border border-red-300 rounded-lg p-3 text-center">
                              <div className="flex items-center justify-center mb-1">
                                <Play className="h-4 w-4 text-red-600 mr-1" />
                                <span className="font-semibold text-red-700">{exercise.intervals.hard.duration}</span>
                              </div>
                              <p className="text-xs text-red-600">{exercise.intervals.hard.description}</p>
                            </div>
                            <div className="bg-green-100 border border-green-300 rounded-lg p-3 text-center">
                              <div className="flex items-center justify-center mb-1">
                                <Pause className="h-4 w-4 text-green-600 mr-1" />
                                <span className="font-semibold text-green-700">{exercise.intervals.easy.duration}</span>
                              </div>
                              <p className="text-xs text-green-600">{exercise.intervals.easy.description}</p>
                            </div>
                          </div>
                          {exercise.intervals.rest && (
                            <div className="flex items-center justify-center text-xs text-blue-600 bg-blue-50 rounded p-2">
                              <Repeat className="h-3 w-3 mr-1" />
                              {exercise.intervals.rest}
                            </div>
                          )}
                        </div>
                      )}

                      {exercise.details && (
                        <ul className="text-sm text-gray-700 space-y-1">
                          {exercise.details.map((detail, detailIndex) => (
                            <li key={detailIndex} className="flex items-center">
                              <span className="w-2 h-2 bg-blue-400 rounded-full mr-2 flex-shrink-0"></span>
                              {detail}
                            </li>
                          ))}
                        </ul>
                      )}

                      {exercise.rest && !exercise.intervals && (
                        <div className="flex items-center justify-center text-xs text-blue-600 bg-blue-50 rounded p-2 mt-2">
                          <Repeat className="h-3 w-3 mr-1" />
                          {exercise.rest}
                        </div>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="mt-8 p-4 bg-white/50 rounded-lg">
          <p className="text-xs text-gray-500 text-center">
            💡 Adapte la charge vers le haut si tu n'es pas assez fatigué.
          </p>
        </div>
      </div>
    </div>
  )
}


export async function generateMetadata({ params }: { params: { number: string } }): Promise<Metadata> {
  const weekNumber = Number.parseInt(params.number)
  const week = workoutData[weekNumber as keyof typeof workoutData]

  if (!week) {
    return {
      title: "Semaine non trouvée - LUC II",
      description: "Cette semaine d'entraînement n'existe pas dans le programme.",
    }
  }

  const sessionTypes = week.sessions.map((s) => s.type).join(", ")

  return {
    title: `${week.title} - LUC II Programme Physique`,
    description: `Entraînements de la ${week.title.toLowerCase()}: ${sessionTypes}. Programme de préparation physique été 2025 pour le LUC II.`,
    keywords: ["floorball", "préparation physique", `semaine ${weekNumber}`, "entraînement", "LUC II"],
    openGraph: {
      title: `${week.title} - LUC II Programme Physique`,
      description: `Entraînements: ${sessionTypes}`,
      type: "article",
      locale: "fr_FR",
      siteName: "LUC II Training App",
    },
    twitter: {
      card: "summary",
      title: `${week.title} - LUC II Programme Physique`,
      description: `Entraînements: ${sessionTypes}`,
    },
  }
}
