import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres"

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_contact_form_link_type" AS ENUM('none', 'reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_contact_form_link_type" AS ENUM('none', 'reference', 'custom');
  ALTER TABLE "_pages_v_blocks_embed_block" RENAME TO "pages_blocks_tally_embed";
  ALTER TABLE "pages_blocks_embed_block" RENAME TO "_pages_v_blocks_tally_embed";
  ALTER TABLE "_pages_v_blocks_tally_embed" DROP CONSTRAINT "pages_blocks_embed_block_image_id_media_id_fk";
  
  ALTER TABLE "_pages_v_blocks_tally_embed" DROP CONSTRAINT "pages_blocks_embed_block_parent_id_fk";
  
  ALTER TABLE "pages_blocks_tally_embed" DROP CONSTRAINT "_pages_v_blocks_embed_block_image_id_media_id_fk";
  
  ALTER TABLE "pages_blocks_tally_embed" DROP CONSTRAINT "_pages_v_blocks_embed_block_parent_id_fk";
  
  DROP INDEX IF EXISTS "pages_blocks_embed_block_order_idx";
  DROP INDEX IF EXISTS "pages_blocks_embed_block_parent_id_idx";
  DROP INDEX IF EXISTS "pages_blocks_embed_block_path_idx";
  DROP INDEX IF EXISTS "pages_blocks_embed_block_image_idx";
  DROP INDEX IF EXISTS "_pages_v_blocks_embed_block_order_idx";
  DROP INDEX IF EXISTS "_pages_v_blocks_embed_block_parent_id_idx";
  DROP INDEX IF EXISTS "_pages_v_blocks_embed_block_path_idx";
  DROP INDEX IF EXISTS "_pages_v_blocks_embed_block_image_idx";

  ALTER TABLE "_pages_v_blocks_tally_embed" ALTER COLUMN "id" SET DATA TYPE integer USING id::integer;
ALTER TABLE "_pages_v_blocks_tally_embed" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY;

  ALTER TABLE "pages_blocks_tally_embed" ALTER COLUMN "id" SET DATA TYPE varchar;
  ALTER TABLE "_pages_v_blocks_tally_embed" ADD COLUMN "_uuid" varchar;
  ALTER TABLE "pages_blocks_contact_form" ADD COLUMN "link_type" "enum_pages_blocks_contact_form_link_type" DEFAULT 'none';
  ALTER TABLE "pages_blocks_contact_form" ADD COLUMN "link_new_tab" boolean;
  ALTER TABLE "pages_blocks_contact_form" ADD COLUMN "link_url" varchar;
  ALTER TABLE "pages_blocks_contact_form" ADD COLUMN "link_label" varchar;
  ALTER TABLE "_pages_v_blocks_contact_form" ADD COLUMN "link_type" "enum__pages_v_blocks_contact_form_link_type" DEFAULT 'none';
  ALTER TABLE "_pages_v_blocks_contact_form" ADD COLUMN "link_new_tab" boolean;
  ALTER TABLE "_pages_v_blocks_contact_form" ADD COLUMN "link_url" varchar;
  ALTER TABLE "_pages_v_blocks_contact_form" ADD COLUMN "link_label" varchar;
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_tally_embed" ADD CONSTRAINT "_pages_v_blocks_tally_embed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_tally_embed" ADD CONSTRAINT "pages_blocks_tally_embed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_tally_embed_order_idx" ON "_pages_v_blocks_tally_embed" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_tally_embed_parent_id_idx" ON "_pages_v_blocks_tally_embed" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_tally_embed_path_idx" ON "_pages_v_blocks_tally_embed" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_tally_embed_order_idx" ON "pages_blocks_tally_embed" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_tally_embed_parent_id_idx" ON "pages_blocks_tally_embed" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_tally_embed_path_idx" ON "pages_blocks_tally_embed" USING btree ("_path");
  ALTER TABLE "_pages_v_blocks_tally_embed" DROP COLUMN IF EXISTS "script";
  ALTER TABLE "_pages_v_blocks_tally_embed" DROP COLUMN IF EXISTS "html";
  ALTER TABLE "_pages_v_blocks_tally_embed" DROP COLUMN IF EXISTS "image_id";
  ALTER TABLE "pages_blocks_contact_form" DROP COLUMN IF EXISTS "script";
  ALTER TABLE "pages_blocks_contact_form" DROP COLUMN IF EXISTS "html";
  ALTER TABLE "pages_blocks_tally_embed" DROP COLUMN IF EXISTS "script";
  ALTER TABLE "pages_blocks_tally_embed" DROP COLUMN IF EXISTS "html";
  ALTER TABLE "pages_blocks_tally_embed" DROP COLUMN IF EXISTS "image_id";
  ALTER TABLE "pages_blocks_tally_embed" DROP COLUMN IF EXISTS "_uuid";
  ALTER TABLE "_pages_v_blocks_contact_form" DROP COLUMN IF EXISTS "script";
  ALTER TABLE "_pages_v_blocks_contact_form" DROP COLUMN IF EXISTS "html";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE IF NOT EXISTS "pages_blocks_embed_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"script" varchar,
  	"html" varchar,
  	"image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_embed_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"script" varchar,
  	"html" varchar,
  	"image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  DROP TABLE "pages_blocks_tally_embed" CASCADE;
  DROP TABLE "_pages_v_blocks_tally_embed" CASCADE;
  ALTER TABLE "pages_blocks_contact_form" ADD COLUMN "script" varchar;
  ALTER TABLE "pages_blocks_contact_form" ADD COLUMN "html" varchar;
  ALTER TABLE "_pages_v_blocks_contact_form" ADD COLUMN "script" varchar;
  ALTER TABLE "_pages_v_blocks_contact_form" ADD COLUMN "html" varchar;
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_embed_block" ADD CONSTRAINT "pages_blocks_embed_block_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_embed_block" ADD CONSTRAINT "pages_blocks_embed_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_embed_block" ADD CONSTRAINT "_pages_v_blocks_embed_block_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_embed_block" ADD CONSTRAINT "_pages_v_blocks_embed_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_blocks_embed_block_order_idx" ON "pages_blocks_embed_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_embed_block_parent_id_idx" ON "pages_blocks_embed_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_embed_block_path_idx" ON "pages_blocks_embed_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_embed_block_image_idx" ON "pages_blocks_embed_block" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_embed_block_order_idx" ON "_pages_v_blocks_embed_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_embed_block_parent_id_idx" ON "_pages_v_blocks_embed_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_embed_block_path_idx" ON "_pages_v_blocks_embed_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_embed_block_image_idx" ON "_pages_v_blocks_embed_block" USING btree ("image_id");
  ALTER TABLE "pages_blocks_contact_form" DROP COLUMN IF EXISTS "link_type";
  ALTER TABLE "pages_blocks_contact_form" DROP COLUMN IF EXISTS "link_new_tab";
  ALTER TABLE "pages_blocks_contact_form" DROP COLUMN IF EXISTS "link_url";
  ALTER TABLE "pages_blocks_contact_form" DROP COLUMN IF EXISTS "link_label";
  ALTER TABLE "_pages_v_blocks_contact_form" DROP COLUMN IF EXISTS "link_type";
  ALTER TABLE "_pages_v_blocks_contact_form" DROP COLUMN IF EXISTS "link_new_tab";
  ALTER TABLE "_pages_v_blocks_contact_form" DROP COLUMN IF EXISTS "link_url";
  ALTER TABLE "_pages_v_blocks_contact_form" DROP COLUMN IF EXISTS "link_label";
  DROP TYPE "public"."enum_pages_blocks_contact_form_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_contact_form_link_type";`)
}
