import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE IF NOT EXISTS "pages_blocks_video_videos" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"video_id" integer
  );

  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_video_videos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"video_id" integer,
  	"_uuid" varchar
  );

  ALTER TABLE "pages_blocks_video_videos" ADD CONSTRAINT "pages_blocks_video_videos_video_id_mux_video_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."mux_video"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_video_videos" ADD CONSTRAINT "pages_blocks_video_videos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_video"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_video_videos" ADD CONSTRAINT "_pages_v_blocks_video_videos_video_id_mux_video_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."mux_video"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_video_videos" ADD CONSTRAINT "_pages_v_blocks_video_videos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_video"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_video_videos_order_idx" ON "pages_blocks_video_videos" USING btree ("_order");
  CREATE INDEX "pages_blocks_video_videos_parent_id_idx" ON "pages_blocks_video_videos" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_video_videos_video_idx" ON "pages_blocks_video_videos" USING btree ("video_id");
  CREATE INDEX "_pages_v_blocks_video_videos_order_idx" ON "_pages_v_blocks_video_videos" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_video_videos_parent_id_idx" ON "_pages_v_blocks_video_videos" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_video_videos_video_idx" ON "_pages_v_blocks_video_videos" USING btree ("video_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_video_videos" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_video_videos" DISABLE ROW LEVEL SECURITY;
  DROP TABLE IF EXISTS "pages_blocks_video_videos" CASCADE;
  DROP TABLE IF EXISTS "_pages_v_blocks_video_videos" CASCADE;`)
}
