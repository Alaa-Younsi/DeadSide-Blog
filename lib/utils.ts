import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

export function formatDateline(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export function formatShortDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

export function getIssueLabel(foundedYear: number, now: Date = new Date()): string {
  const startOfYear = new Date(Date.UTC(now.getUTCFullYear(), 0, 1))
  const dayOfYear = Math.floor((now.getTime() - startOfYear.getTime()) / 86_400_000) + 1
  const volume = now.getUTCFullYear() - foundedYear + 1
  return `Vol. ${volume} — No. ${dayOfYear}`
}
