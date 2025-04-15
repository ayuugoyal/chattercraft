// import { neon } from "@neondatabase/serverless"
// import { drizzle } from "drizzle-orm/neon-http"

// import * as schema from "./schema"

// // Create database connection
// const sql = neon(process.env.DATABASE_URL!)
// export const db = drizzle(sql, { schema })

import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";

export const db = drizzle(process.env.DATABASE_URL!, { schema });
