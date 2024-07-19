import { JetBrains_Mono as FontMono, Exo_2 as FontSans } from "next/font/google"

// NOTE fonts I liked: Exo_2, Red_Hat_Text, Syne, Gabarito

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
})
