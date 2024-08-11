DO $$ BEGIN
 CREATE TYPE "public"."gender" AS ENUM('male', 'female');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "patient" (
	"id" text PRIMARY KEY NOT NULL,
	"full_name" text NOT NULL,
	"gender" "gender" NOT NULL,
	"birthdate" date NOT NULL,
	"allergies" boolean NOT NULL,
	"phone_number" text,
	"telegram" text,
	"instagram" text
);
