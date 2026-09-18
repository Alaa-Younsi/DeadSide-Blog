import { Barlow_Condensed, Playfair_Display, Source_Serif_4 } from "next/font/google"

export const headlineFont = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-headline",
  display: "swap",
})

export const bodyFont = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
})

export const meta = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-meta",
  display: "swap",
})
