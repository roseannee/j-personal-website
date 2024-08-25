import { JetBrains_Mono as FontMono, Exo_2 as FontSans } from "next/font/google"

export const fontSans = FontSans({
  subsets: ["cyrillic"],
  variable: "--font-sans",
})

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
})
