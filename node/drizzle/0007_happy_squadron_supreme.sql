ALTER TABLE "appointments" RENAME COLUMN "timestamp" TO "created";--> statement-breakpoint
ALTER TABLE "questions" RENAME COLUMN "timestamp" TO "created";--> statement-breakpoint
ALTER TABLE "appointments" ADD COLUMN "modified" timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE "appointments" ADD COLUMN "creator" text NOT NULL;--> statement-breakpoint
ALTER TABLE "questions" ADD COLUMN "modified" timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE "questions" ADD COLUMN "creator" text NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "appointments" ADD CONSTRAINT "appointments_creator_users_id_fk" FOREIGN KEY ("creator") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "questions" ADD CONSTRAINT "questions_creator_users_id_fk" FOREIGN KEY ("creator") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
