import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dbCredentials: {
    database: process.env.POSTGRES_DB || "database",
    host: process.env.POSTGRES_HOST || "host",
    password: process.env.POSTGRES_PASSWORD,
    port: Number(process.env.POSTGRES_PORT) || 5432,
    ssl: Boolean(process.env.POSTGRES_SSL) || false,
    user: process.env.POSTGRES_USER,
  },
  dialect: "postgresql",
  out: "./drizzle",
  schema: "./src/lib/schemas",
});
