import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Goal, Zap } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { workoutData } from "@/app/domain/workout";

export default function HomePage() {
  const weeks = Object.entries(workoutData);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8 pt-8">
          <div className="flex items-center justify-center mb-4">
            <Goal className="h-8 w-8 text-blue-600 mr-2" />
            <h1 className="text-2xl font-bold text-gray-900">LUC II</h1>
          </div>
          <h2 className="text-lg text-gray-600 mb-2">
            Programme préparation physique - Été 2025
          </h2>
        </div>

        <div className="space-y-4">
          {weeks.map(([number, week]) => (
            <Link key={number} href={`/week/${number}`}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-blue-200">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center justify-between">
                    <span className="text-lg">{week.title}</span>
                    <div className="flex flex-row items-center text-blue-600 gap-1">
                      <Calendar className="h-5 w-5" />
                      <span className="text-xs">{week.date}</span>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm mb-3">
                    {week.description}
                  </p>
                  <div className="flex items-center text-xs text-blue-600">
                    <Zap className="h-3 w-3 mr-1" />
                    <span>3 sessions</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mt-8 p-4 bg-white/50 rounded-lg">
          <p className="text-xs text-gray-500 text-center">
            Chaque semaine comprend 3 sessions: endurance de base, travail au
            seuil, et renforcement/explosivité
          </p>
        </div>
      </div>
    </div>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "LUC II - Programme Préparation Physique Été 2025",
    description:
      "Programme d'entraînement pour le LUC II. Préparation physique été 2025 avec 3 sessions par semaine: endurance, seuil et renforcement.",
    keywords: [
      "floorball",
      "LUC II",
      "préparation physique",
      "entraînement",
      "été 2025",
      "programme sportif",
    ],
    openGraph: {
      title: "LUC II - Programme Préparation Physique",
      description:
        "Programme d'entraînement physique été 2025 - 3 sessions par semaine",
      type: "website",
      locale: "fr_FR",
      siteName: "LUC II Training App",
    },
    twitter: {
      card: "summary_large_image",
      title: "LUC II - Programme Préparation Physique",
      description: "Programme d'entraînement physique été 2025",
    },
  };
}
