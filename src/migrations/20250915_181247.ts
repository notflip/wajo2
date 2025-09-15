import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_calculator_bg_color" AS ENUM('beige', 'gray', 'blue', 'black');
  CREATE TYPE "public"."enum__pages_v_blocks_calculator_bg_color" AS ENUM('beige', 'gray', 'blue', 'black');
  CREATE TABLE "pages_blocks_calculator" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT '🏥 Medische Praktijk Omzet Calculator',
  	"description" varchar DEFAULT 'Schat uw maandelijkse afspraken en omzetpotentieel met verschillende boekingskanalen en marketingstrategieën',
  	"bg_color" "enum_pages_blocks_calculator_bg_color",
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_calculator" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT '🏥 Medische Praktijk Omzet Calculator',
  	"description" varchar DEFAULT 'Schat uw maandelijkse afspraken en omzetpotentieel met verschillende boekingskanalen en marketingstrategieën',
  	"bg_color" "enum__pages_v_blocks_calculator_bg_color",
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  DROP INDEX "_cases_v_version_testimonial_group_version_testimonial_group_image_idx";
  ALTER TABLE "pages_blocks_calculator" ADD CONSTRAINT "pages_blocks_calculator_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_calculator" ADD CONSTRAINT "_pages_v_blocks_calculator_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_calculator_order_idx" ON "pages_blocks_calculator" USING btree ("_order");
  CREATE INDEX "pages_blocks_calculator_parent_id_idx" ON "pages_blocks_calculator" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_calculator_path_idx" ON "pages_blocks_calculator" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_calculator_order_idx" ON "_pages_v_blocks_calculator" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_calculator_parent_id_idx" ON "_pages_v_blocks_calculator" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_calculator_path_idx" ON "_pages_v_blocks_calculator" USING btree ("_path");
  CREATE INDEX "_cases_v_version_testimonial_group_version_testimonial_g_idx" ON "_cases_v" USING btree ("version_testimonial_group_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_calculator" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_calculator" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_calculator" CASCADE;
  DROP TABLE "_pages_v_blocks_calculator" CASCADE;
  DROP INDEX "_cases_v_version_testimonial_group_version_testimonial_g_idx";
  CREATE INDEX "_cases_v_version_testimonial_group_version_testimonial_group_image_idx" ON "_cases_v" USING btree ("version_testimonial_group_image_id");
  DROP TYPE "public"."enum_pages_blocks_calculator_bg_color";
  DROP TYPE "public"."enum__pages_v_blocks_calculator_bg_color";`)
}
