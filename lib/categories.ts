export type Accent = "press-red" | "ink-blue"

export interface Category {
  slug: string
  name: string
  desk: string
  description: string
  accent: Accent
}

export const categories = [
  {
    slug: "technology",
    name: "Technology",
    desk: "The Tech Desk",
    description: "Software, hardware, and the machines quietly reshaping how we live and work.",
    accent: "ink-blue",
  },
  {
    slug: "culture",
    name: "Culture",
    desk: "The Culture Desk",
    description: "Film, music, internet life, and the ideas moving through the wider world.",
    accent: "press-red",
  },
  {
    slug: "stories",
    name: "Stories",
    desk: "Features Desk",
    description: "Essays, personal accounts, and long-form narrative writing.",
    accent: "ink-blue",
  },
  {
    slug: "experiments",
    name: "Experiments",
    desk: "The Lab",
    description: "Side projects, prototypes, and things built for the sake of building them.",
    accent: "press-red",
  },
] as const satisfies readonly Category[]

export type CategorySlug = (typeof categories)[number]["slug"]

export function getCategory(slug: string): Category | undefined {
  return categories.find((category) => category.slug === slug)
}

export function isCategorySlug(slug: string): slug is CategorySlug {
  return categories.some((category) => category.slug === slug)
}
