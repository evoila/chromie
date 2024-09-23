DO $$ BEGIN
 CREATE TYPE "public"."status" AS ENUM('Not started', 'In progress', 'Done');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "appointments" ALTER COLUMN "date" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "appointments" ADD COLUMN "status" "status" DEFAULT 'Not started';--> statement-breakpoint
ALTER TABLE "appointments" ADD COLUMN "revisor" text;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "appointments" ADD CONSTRAINT "appointments_revisor_users_id_fk" FOREIGN KEY ("revisor") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
