CREATE TABLE IF NOT EXISTS "time-ranges" (
	"id" serial PRIMARY KEY NOT NULL,
	"date" date NOT NULL,
	"end" text NOT NULL,
	"start" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "slots" RENAME TO "time-slots";