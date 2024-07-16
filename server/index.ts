import { neon } from "@neondatabase/serverless"
import { config } from "dotenv"
import { drizzle, NeonHttpDatabase } from "drizzle-orm/neon-http"

import * as schema from "./schema"

config({ path: ".env" })

const sql = neon(process.env.DB_URL!)
const db = drizzle(sql, { schema }) as NeonHttpDatabase<typeof schema>

export default db
