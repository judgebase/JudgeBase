CREATE TABLE "hackathons" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"organizer_name" text NOT NULL,
	"organizer_email" text NOT NULL,
	"organizer_phone" text NOT NULL,
	"hackathon_type" text NOT NULL,
	"participant_count" integer NOT NULL,
	"date" timestamp NOT NULL,
	"location" text NOT NULL,
	"description" text NOT NULL,
	"judging_criteria" text NOT NULL,
	"prizes" text NOT NULL,
	"status" text DEFAULT 'pending' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "judge_applications" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"full_name" text NOT NULL,
	"email" text NOT NULL,
	"current_role" text NOT NULL,
	"linkedin" text NOT NULL,
	"twitter_or_website" text,
	"avatar" text,
	"has_judged_before" boolean NOT NULL,
	"previous_experience" text,
	"expertise" text[] NOT NULL,
	"other_expertise" text,
	"short_bio" text NOT NULL,
	"judging_philosophy" text NOT NULL,
	"open_to_mentoring" text NOT NULL,
	"preferred_format" text[] NOT NULL,
	"why_join_judge_base" text,
	"anything_else" text,
	"consent_agreed" boolean NOT NULL,
	"status" text DEFAULT 'pending' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "judge_hackathons" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"judge_id" uuid NOT NULL,
	"hackathon_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "judges" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"title" text NOT NULL,
	"company" text NOT NULL,
	"location" text NOT NULL,
	"bio" text NOT NULL,
	"judging_philosophy" text NOT NULL,
	"linkedin" text NOT NULL,
	"twitter" text NOT NULL,
	"website" text NOT NULL,
	"avatar" text,
	"expertise" text[] NOT NULL,
	"experience" text NOT NULL,
	"slug" text NOT NULL,
	"status" text DEFAULT 'pending' NOT NULL,
	"featured" boolean DEFAULT false,
	"badges" text[] DEFAULT '{}',
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "judges_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"username" text NOT NULL,
	"password" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_username_unique" UNIQUE("username")
);
--> statement-breakpoint
ALTER TABLE "judge_hackathons" ADD CONSTRAINT "judge_hackathons_judge_id_judges_id_fk" FOREIGN KEY ("judge_id") REFERENCES "public"."judges"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "judge_hackathons" ADD CONSTRAINT "judge_hackathons_hackathon_id_hackathons_id_fk" FOREIGN KEY ("hackathon_id") REFERENCES "public"."hackathons"("id") ON DELETE no action ON UPDATE no action;