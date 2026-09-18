export const site = {
  name: "Dead Side",
  nameplate: "THE DEAD SIDE",
  tagline: "All the News That's Fit to Build",
  description:
    "A personal newspaper of thoughts, stories, and experiments — technology, culture, and everything between the desks.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  founded: 2024,
  author: "Alaa Younsi",
  locale: "en-US",
} as const
