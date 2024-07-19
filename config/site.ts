import { navConfig } from "./nav.config"

export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Website",
  description: "J Personal Website",
  mainNav: navConfig,
  links: {
    github: "https://github.com/roseannee",
  },
}
