import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dbCredentials: {
    database: process.env.POSTGRESQL_DB || "database",
    host: process.env.POSTGRESQL_HOST || "host",
    password: process.env.POSTGRESQL_PASSWORD,
    port: Number(process.env.POSTGRESQL_PORT) || 5432,
    ssl: Boolean(process.env.POSTGRESQL_SSL) || false,
    user: process.env.POSTGRESQL_USER,
  },
  dialect: "postgresql",
  out: "./drizzle",
  schema: "./src/lib/schemas",
});
