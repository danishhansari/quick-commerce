CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"fname" varchar(100) NOT NULL,
	"lname" varchar(100) NOT NULL,
	"email" varchar(100) NOT NULL,
	"provider" varchar(20) NOT NULL,
	"external_id" varchar(100) NOT NULL,
	"image" text NOT NULL,
	"role" varchar(12) DEFAULT 'customer' NOT NULL,
	"updated_at" timestamp DEFAULT now(),
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
