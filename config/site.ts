import { navConfig } from "./nav.config"

export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Мій робочий простір",
  description: "Мій робочий простір",
  mainNav: navConfig,
}
