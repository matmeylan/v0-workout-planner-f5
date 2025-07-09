import {Week} from "@/app/domain/workout";

export function isCurrentWeek(week: Week): boolean {
  const now = new Date()
  return now >= week.startDate && now <= week.endDate
}