ALTER TYPE "status" ADD VALUE 'open';--> statement-breakpoint
ALTER TYPE "status" ADD VALUE 'closed';--> statement-breakpoint
ALTER TYPE "role" ADD VALUE 'requester';--> statement-breakpoint
ALTER TYPE "role" ADD VALUE 'responder';--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "slots" (
	"id" serial PRIMARY KEY NOT NULL,
	"date" date NOT NULL,
	"end" text NOT NULL,
	"start" text NOT NULL,
	"status" "status" DEFAULT 'open'
);
--> statement-breakpoint
ALTER TABLE "appointments" ALTER COLUMN "status" SET NOT NULL;