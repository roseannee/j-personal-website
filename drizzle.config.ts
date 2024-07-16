import { config } from "dotenv"
import { defineConfig } from "drizzle-kit"

config({ path: ".env" })

export default defineConfig({
  schema: "./server/schema.ts",
  out: "./server/migrations", //TODO is it needed?
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DB_URL!,
  },
})
