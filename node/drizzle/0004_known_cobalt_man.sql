CREATE TABLE IF NOT EXISTS "appointments" (
	"id" serial PRIMARY KEY NOT NULL,
	"date" date,
	"description" text NOT NULL,
	"timestamp" timestamp NOT NULL,
	"title" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "questions" (
	"id" serial PRIMARY KEY NOT NULL,
	"description" text NOT NULL,
	"timestamp" timestamp NOT NULL,
	"text" text NOT NULL
);
--> statement-breakpoint
DROP TABLE "requests";