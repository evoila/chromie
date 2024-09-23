import { migrate } from "drizzle-orm/node-postgres/migrator";

import { db, pool } from "@/lib/db";

async function main() {
  await migrate(db, { migrationsFolder: "./drizzle" });

  await pool.end();
}

main();
