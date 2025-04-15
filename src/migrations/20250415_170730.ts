import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_hero_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_hero_text_align" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum_pages_blocks_hero_bg_color" AS ENUM('beige', 'black');
  CREATE TYPE "public"."enum_pages_blocks_paragraph_bg_color" AS ENUM('beige');
  CREATE TYPE "public"."enum_pages_blocks_cards_bg_color" AS ENUM('beige');
  CREATE TYPE "public"."enum_pages_blocks_cases_link_type" AS ENUM('none', 'reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_feature_rows_bg_color" AS ENUM('beige', 'gray');
  CREATE TYPE "public"."enum_pages_blocks_feature_list_items_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_feature_list_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_feature_testimonials_bg_color" AS ENUM('black');
  CREATE TYPE "public"."enum_pages_blocks_testimonials_bg_color" AS ENUM('beige', 'gray');
  CREATE TYPE "public"."enum_pages_blocks_team_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_team_bg_color" AS ENUM('beige');
  CREATE TYPE "public"."enum_pages_blocks_feature_variant" AS ENUM('imageLeft', 'imageRight');
  CREATE TYPE "public"."enum_pages_blocks_slider_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_slider_bg_color" AS ENUM('beige');
  CREATE TYPE "public"."enum_pages_blocks_logos_bg_color" AS ENUM('beige');
  CREATE TYPE "public"."enum_pages_blocks_cta_block_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_cta_block_bg_color" AS ENUM('blue');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_text_align" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_bg_color" AS ENUM('beige', 'black');
  CREATE TYPE "public"."enum__pages_v_blocks_paragraph_bg_color" AS ENUM('beige');
  CREATE TYPE "public"."enum__pages_v_blocks_cards_bg_color" AS ENUM('beige');
  CREATE TYPE "public"."enum__pages_v_blocks_cases_link_type" AS ENUM('none', 'reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_feature_rows_bg_color" AS ENUM('beige', 'gray');
  CREATE TYPE "public"."enum__pages_v_blocks_feature_list_items_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_feature_list_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_feature_testimonials_bg_color" AS ENUM('black');
  CREATE TYPE "public"."enum__pages_v_blocks_testimonials_bg_color" AS ENUM('beige', 'gray');
  CREATE TYPE "public"."enum__pages_v_blocks_team_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_team_bg_color" AS ENUM('beige');
  CREATE TYPE "public"."enum__pages_v_blocks_feature_variant" AS ENUM('imageLeft', 'imageRight');
  CREATE TYPE "public"."enum__pages_v_blocks_slider_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_slider_bg_color" AS ENUM('beige');
  CREATE TYPE "public"."enum__pages_v_blocks_logos_bg_color" AS ENUM('beige');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_block_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_block_bg_color" AS ENUM('blue');
  CREATE TYPE "public"."enum_cases_tags" AS ENUM('copywriting', 'webdevelopment', 'webdesign', 'marketing');
  CREATE TYPE "public"."enum_cases_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__cases_v_version_tags" AS ENUM('copywriting', 'webdevelopment', 'webdesign', 'marketing');
  CREATE TYPE "public"."enum__cases_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_shared_blocks_blocks_cta_block_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_shared_blocks_blocks_cta_block_bg_color" AS ENUM('blue');
  CREATE TYPE "public"."enum_shared_blocks_blocks_logos_bg_color" AS ENUM('beige');
  CREATE TABLE IF NOT EXISTS "pages_blocks_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_blocks_hero_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"content" varchar,
  	"text_align" "enum_pages_blocks_hero_text_align" DEFAULT 'left',
  	"bg_color" "enum_pages_blocks_hero_bg_color",
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_image" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"callout_content" varchar,
  	"callout_link_id" integer,
  	"callout_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_paragraph" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"badge" varchar,
  	"content" varchar,
  	"bg_color" "enum_pages_blocks_paragraph_bg_color",
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_cards_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"title" varchar,
  	"text" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"bg_color" "enum_pages_blocks_cards_bg_color",
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_cases" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"badge" varchar,
  	"title" varchar,
  	"link_type" "enum_pages_blocks_cases_link_type" DEFAULT 'none',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_feature_rows_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"title" varchar,
  	"text" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_feature_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"badge" varchar,
  	"title" varchar,
  	"bg_color" "enum_pages_blocks_feature_rows_bg_color",
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_feature_list_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar,
  	"link_type" "enum_pages_blocks_feature_list_items_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_feature_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"badge" varchar,
  	"title" varchar,
  	"link_type" "enum_pages_blocks_feature_list_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_feature_testimonials_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"author_name" varchar,
  	"author_company" varchar,
  	"author_avatar_id" integer,
  	"link_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_feature_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"badge" varchar,
  	"title" varchar,
  	"bg_color" "enum_pages_blocks_feature_testimonials_bg_color",
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_testimonials_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"text" varchar,
  	"image_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"badge" varchar,
  	"title" varchar,
  	"bg_color" "enum_pages_blocks_testimonials_bg_color",
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_team_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_blocks_team_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_team_members" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_team" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"badge" varchar,
  	"title" varchar,
  	"content" varchar,
  	"show_line" boolean,
  	"bg_color" "enum_pages_blocks_team_bg_color",
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_feature" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"subtitle" varchar,
  	"title" varchar,
  	"content" jsonb,
  	"image_id" integer,
  	"variant" "enum_pages_blocks_feature_variant" DEFAULT 'imageLeft',
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_slider_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_blocks_slider_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_slider_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"title" varchar,
  	"content" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_slider" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"subtitle" varchar,
  	"title" varchar,
  	"bg_color" "enum_pages_blocks_slider_bg_color" DEFAULT 'beige',
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_logos_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"bg_color" "enum_pages_blocks_logos_bg_color",
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_process_slider_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"content" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_process_slider" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"subtitle" varchar,
  	"title" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_cta_block_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_blocks_cta_block_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__pages_v_blocks_hero_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"content" varchar,
  	"text_align" "enum__pages_v_blocks_hero_text_align" DEFAULT 'left',
  	"bg_color" "enum__pages_v_blocks_hero_bg_color",
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_image" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"callout_content" varchar,
  	"callout_link_id" integer,
  	"callout_image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_paragraph" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"badge" varchar,
  	"content" varchar,
  	"bg_color" "enum__pages_v_blocks_paragraph_bg_color",
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_cards_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"title" varchar,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"bg_color" "enum__pages_v_blocks_cards_bg_color",
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_cases" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"badge" varchar,
  	"title" varchar,
  	"link_type" "enum__pages_v_blocks_cases_link_type" DEFAULT 'none',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_feature_rows_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"title" varchar,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_feature_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"badge" varchar,
  	"title" varchar,
  	"bg_color" "enum__pages_v_blocks_feature_rows_bg_color",
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_feature_list_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar,
  	"link_type" "enum__pages_v_blocks_feature_list_items_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_feature_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"badge" varchar,
  	"title" varchar,
  	"link_type" "enum__pages_v_blocks_feature_list_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_feature_testimonials_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"author_name" varchar,
  	"author_company" varchar,
  	"author_avatar_id" integer,
  	"link_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_feature_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"badge" varchar,
  	"title" varchar,
  	"bg_color" "enum__pages_v_blocks_feature_testimonials_bg_color",
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_testimonials_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"text" varchar,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"badge" varchar,
  	"title" varchar,
  	"bg_color" "enum__pages_v_blocks_testimonials_bg_color",
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_team_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__pages_v_blocks_team_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_team_members" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_team" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"badge" varchar,
  	"title" varchar,
  	"content" varchar,
  	"show_line" boolean,
  	"bg_color" "enum__pages_v_blocks_team_bg_color",
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_feature" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"subtitle" varchar,
  	"title" varchar,
  	"content" jsonb,
  	"image_id" integer,
  	"variant" "enum__pages_v_blocks_feature_variant" DEFAULT 'imageLeft',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_slider_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__pages_v_blocks_slider_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_slider_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"title" varchar,
  	"content" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_slider" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"subtitle" varchar,
  	"title" varchar,
  	"bg_color" "enum__pages_v_blocks_slider_bg_color" DEFAULT 'beige',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_logos_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"bg_color" "enum__pages_v_blocks_logos_bg_color",
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_process_slider_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"content" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_process_slider" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"subtitle" varchar,
  	"title" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_cta_block_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__pages_v_blocks_cta_block_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "cases_tags" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_cases_tags",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "cases" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"title" varchar,
  	"image_id" integer,
  	"callout_content" varchar,
  	"callout_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_cases_status" DEFAULT 'draft'
  );
  
  CREATE TABLE IF NOT EXISTS "_cases_v_version_tags" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__cases_v_version_tags",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "_cases_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_slug" varchar,
  	"version_title" varchar,
  	"version_image_id" integer,
  	"version_callout_content" varchar,
  	"version_callout_image_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__cases_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE IF NOT EXISTS "shared_blocks_blocks_cta_block_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_shared_blocks_blocks_cta_block_links_link_type" DEFAULT 'reference' NOT NULL,
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "shared_blocks_blocks_logos_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "shared_blocks_blocks_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"bg_color" "enum_shared_blocks_blocks_logos_bg_color",
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "settings_avatars" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  ALTER TABLE "pages_blocks_cta_block" DROP CONSTRAINT "pages_blocks_cta_block_image_id_media_id_fk";
  
  ALTER TABLE "_pages_v_blocks_cta_block" DROP CONSTRAINT "_pages_v_blocks_cta_block_image_id_media_id_fk";
  
  ALTER TABLE "shared_blocks_blocks_cta_block" DROP CONSTRAINT "shared_blocks_blocks_cta_block_image_id_media_id_fk";
  
  DROP INDEX IF EXISTS "pages_blocks_cta_block_image_idx";
  DROP INDEX IF EXISTS "_pages_v_blocks_cta_block_image_idx";
  DROP INDEX IF EXISTS "shared_blocks_blocks_cta_block_image_idx";
  ALTER TABLE "shared_blocks_blocks_cta_block" ALTER COLUMN "text" DROP NOT NULL;
  ALTER TABLE "pages_blocks_cta_block" ADD COLUMN "bg_color" "enum_pages_blocks_cta_block_bg_color" DEFAULT 'blue';
  ALTER TABLE "_pages_v_blocks_cta_block" ADD COLUMN "bg_color" "enum__pages_v_blocks_cta_block_bg_color" DEFAULT 'blue';
  ALTER TABLE "shared_blocks_blocks_cta_block" ADD COLUMN "bg_color" "enum_shared_blocks_blocks_cta_block_bg_color" DEFAULT 'blue';
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "cases_id" integer;
  ALTER TABLE "settings" ADD COLUMN "logo_id" integer NOT NULL;
  ALTER TABLE "settings" ADD COLUMN "company_info" varchar NOT NULL;
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_hero_links" ADD CONSTRAINT "pages_blocks_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_image" ADD CONSTRAINT "pages_blocks_image_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_image" ADD CONSTRAINT "pages_blocks_image_callout_link_id_cases_id_fk" FOREIGN KEY ("callout_link_id") REFERENCES "public"."cases"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_image" ADD CONSTRAINT "pages_blocks_image_callout_image_id_media_id_fk" FOREIGN KEY ("callout_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_image" ADD CONSTRAINT "pages_blocks_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_paragraph" ADD CONSTRAINT "pages_blocks_paragraph_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_cards_items" ADD CONSTRAINT "pages_blocks_cards_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cards"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_cards" ADD CONSTRAINT "pages_blocks_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_cases" ADD CONSTRAINT "pages_blocks_cases_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_feature_rows_items" ADD CONSTRAINT "pages_blocks_feature_rows_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_feature_rows"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_feature_rows" ADD CONSTRAINT "pages_blocks_feature_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_feature_list_items" ADD CONSTRAINT "pages_blocks_feature_list_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_feature_list"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_feature_list" ADD CONSTRAINT "pages_blocks_feature_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_feature_testimonials_items" ADD CONSTRAINT "pages_blocks_feature_testimonials_items_author_avatar_id_media_id_fk" FOREIGN KEY ("author_avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_feature_testimonials_items" ADD CONSTRAINT "pages_blocks_feature_testimonials_items_link_id_cases_id_fk" FOREIGN KEY ("link_id") REFERENCES "public"."cases"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_feature_testimonials_items" ADD CONSTRAINT "pages_blocks_feature_testimonials_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_feature_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_feature_testimonials" ADD CONSTRAINT "pages_blocks_feature_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_testimonials_items" ADD CONSTRAINT "pages_blocks_testimonials_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_testimonials_items" ADD CONSTRAINT "pages_blocks_testimonials_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_testimonials" ADD CONSTRAINT "pages_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_team_links" ADD CONSTRAINT "pages_blocks_team_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_team"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_team_members" ADD CONSTRAINT "pages_blocks_team_members_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_team_members" ADD CONSTRAINT "pages_blocks_team_members_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_team"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_team" ADD CONSTRAINT "pages_blocks_team_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_feature" ADD CONSTRAINT "pages_blocks_feature_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_feature" ADD CONSTRAINT "pages_blocks_feature_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_slider_links" ADD CONSTRAINT "pages_blocks_slider_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_slider"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_slider_items" ADD CONSTRAINT "pages_blocks_slider_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_slider"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_slider" ADD CONSTRAINT "pages_blocks_slider_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_logos_items" ADD CONSTRAINT "pages_blocks_logos_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_logos_items" ADD CONSTRAINT "pages_blocks_logos_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_logos"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_logos" ADD CONSTRAINT "pages_blocks_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_process_slider_items" ADD CONSTRAINT "pages_blocks_process_slider_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_process_slider"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_process_slider" ADD CONSTRAINT "pages_blocks_process_slider_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_cta_block_links" ADD CONSTRAINT "pages_blocks_cta_block_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cta_block"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_hero_links" ADD CONSTRAINT "_pages_v_blocks_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_image" ADD CONSTRAINT "_pages_v_blocks_image_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_image" ADD CONSTRAINT "_pages_v_blocks_image_callout_link_id_cases_id_fk" FOREIGN KEY ("callout_link_id") REFERENCES "public"."cases"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_image" ADD CONSTRAINT "_pages_v_blocks_image_callout_image_id_media_id_fk" FOREIGN KEY ("callout_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_image" ADD CONSTRAINT "_pages_v_blocks_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_paragraph" ADD CONSTRAINT "_pages_v_blocks_paragraph_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_cards_items" ADD CONSTRAINT "_pages_v_blocks_cards_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cards"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_cards" ADD CONSTRAINT "_pages_v_blocks_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_cases" ADD CONSTRAINT "_pages_v_blocks_cases_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_feature_rows_items" ADD CONSTRAINT "_pages_v_blocks_feature_rows_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_feature_rows"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_feature_rows" ADD CONSTRAINT "_pages_v_blocks_feature_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_feature_list_items" ADD CONSTRAINT "_pages_v_blocks_feature_list_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_feature_list"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_feature_list" ADD CONSTRAINT "_pages_v_blocks_feature_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_feature_testimonials_items" ADD CONSTRAINT "_pages_v_blocks_feature_testimonials_items_author_avatar_id_media_id_fk" FOREIGN KEY ("author_avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_feature_testimonials_items" ADD CONSTRAINT "_pages_v_blocks_feature_testimonials_items_link_id_cases_id_fk" FOREIGN KEY ("link_id") REFERENCES "public"."cases"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_feature_testimonials_items" ADD CONSTRAINT "_pages_v_blocks_feature_testimonials_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_feature_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_feature_testimonials" ADD CONSTRAINT "_pages_v_blocks_feature_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_testimonials_items" ADD CONSTRAINT "_pages_v_blocks_testimonials_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_testimonials_items" ADD CONSTRAINT "_pages_v_blocks_testimonials_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_testimonials" ADD CONSTRAINT "_pages_v_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_team_links" ADD CONSTRAINT "_pages_v_blocks_team_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_team"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_team_members" ADD CONSTRAINT "_pages_v_blocks_team_members_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_team_members" ADD CONSTRAINT "_pages_v_blocks_team_members_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_team"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_team" ADD CONSTRAINT "_pages_v_blocks_team_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_feature" ADD CONSTRAINT "_pages_v_blocks_feature_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_feature" ADD CONSTRAINT "_pages_v_blocks_feature_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_slider_links" ADD CONSTRAINT "_pages_v_blocks_slider_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_slider"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_slider_items" ADD CONSTRAINT "_pages_v_blocks_slider_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_slider"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_slider" ADD CONSTRAINT "_pages_v_blocks_slider_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_logos_items" ADD CONSTRAINT "_pages_v_blocks_logos_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_logos_items" ADD CONSTRAINT "_pages_v_blocks_logos_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_logos"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_logos" ADD CONSTRAINT "_pages_v_blocks_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_process_slider_items" ADD CONSTRAINT "_pages_v_blocks_process_slider_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_process_slider"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_process_slider" ADD CONSTRAINT "_pages_v_blocks_process_slider_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_cta_block_links" ADD CONSTRAINT "_pages_v_blocks_cta_block_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cta_block"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "cases_tags" ADD CONSTRAINT "cases_tags_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."cases"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "cases" ADD CONSTRAINT "cases_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "cases" ADD CONSTRAINT "cases_callout_image_id_media_id_fk" FOREIGN KEY ("callout_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_cases_v_version_tags" ADD CONSTRAINT "_cases_v_version_tags_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_cases_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_cases_v" ADD CONSTRAINT "_cases_v_parent_id_cases_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."cases"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_cases_v" ADD CONSTRAINT "_cases_v_version_image_id_media_id_fk" FOREIGN KEY ("version_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_cases_v" ADD CONSTRAINT "_cases_v_version_callout_image_id_media_id_fk" FOREIGN KEY ("version_callout_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "shared_blocks_blocks_cta_block_links" ADD CONSTRAINT "shared_blocks_blocks_cta_block_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."shared_blocks_blocks_cta_block"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "shared_blocks_blocks_logos_items" ADD CONSTRAINT "shared_blocks_blocks_logos_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "shared_blocks_blocks_logos_items" ADD CONSTRAINT "shared_blocks_blocks_logos_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."shared_blocks_blocks_logos"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "shared_blocks_blocks_logos" ADD CONSTRAINT "shared_blocks_blocks_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."shared_blocks"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "settings_avatars" ADD CONSTRAINT "settings_avatars_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "settings_avatars" ADD CONSTRAINT "settings_avatars_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."settings"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_blocks_hero_links_order_idx" ON "pages_blocks_hero_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_hero_links_parent_id_idx" ON "pages_blocks_hero_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_hero_order_idx" ON "pages_blocks_hero" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_hero_parent_id_idx" ON "pages_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_hero_path_idx" ON "pages_blocks_hero" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_image_order_idx" ON "pages_blocks_image" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_image_parent_id_idx" ON "pages_blocks_image" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_image_path_idx" ON "pages_blocks_image" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_image_image_idx" ON "pages_blocks_image" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_image_callout_callout_link_idx" ON "pages_blocks_image" USING btree ("callout_link_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_image_callout_callout_image_idx" ON "pages_blocks_image" USING btree ("callout_image_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_paragraph_order_idx" ON "pages_blocks_paragraph" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_paragraph_parent_id_idx" ON "pages_blocks_paragraph" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_paragraph_path_idx" ON "pages_blocks_paragraph" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_cards_items_order_idx" ON "pages_blocks_cards_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_cards_items_parent_id_idx" ON "pages_blocks_cards_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_cards_order_idx" ON "pages_blocks_cards" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_cards_parent_id_idx" ON "pages_blocks_cards" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_cards_path_idx" ON "pages_blocks_cards" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_cases_order_idx" ON "pages_blocks_cases" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_cases_parent_id_idx" ON "pages_blocks_cases" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_cases_path_idx" ON "pages_blocks_cases" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_feature_rows_items_order_idx" ON "pages_blocks_feature_rows_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_feature_rows_items_parent_id_idx" ON "pages_blocks_feature_rows_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_feature_rows_order_idx" ON "pages_blocks_feature_rows" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_feature_rows_parent_id_idx" ON "pages_blocks_feature_rows" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_feature_rows_path_idx" ON "pages_blocks_feature_rows" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_feature_list_items_order_idx" ON "pages_blocks_feature_list_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_feature_list_items_parent_id_idx" ON "pages_blocks_feature_list_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_feature_list_order_idx" ON "pages_blocks_feature_list" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_feature_list_parent_id_idx" ON "pages_blocks_feature_list" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_feature_list_path_idx" ON "pages_blocks_feature_list" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_feature_testimonials_items_order_idx" ON "pages_blocks_feature_testimonials_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_feature_testimonials_items_parent_id_idx" ON "pages_blocks_feature_testimonials_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_feature_testimonials_items_author_avatar_idx" ON "pages_blocks_feature_testimonials_items" USING btree ("author_avatar_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_feature_testimonials_items_link_idx" ON "pages_blocks_feature_testimonials_items" USING btree ("link_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_feature_testimonials_order_idx" ON "pages_blocks_feature_testimonials" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_feature_testimonials_parent_id_idx" ON "pages_blocks_feature_testimonials" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_feature_testimonials_path_idx" ON "pages_blocks_feature_testimonials" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_testimonials_items_order_idx" ON "pages_blocks_testimonials_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_testimonials_items_parent_id_idx" ON "pages_blocks_testimonials_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_testimonials_items_image_idx" ON "pages_blocks_testimonials_items" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_testimonials_order_idx" ON "pages_blocks_testimonials" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_testimonials_parent_id_idx" ON "pages_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_testimonials_path_idx" ON "pages_blocks_testimonials" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_team_links_order_idx" ON "pages_blocks_team_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_team_links_parent_id_idx" ON "pages_blocks_team_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_team_members_order_idx" ON "pages_blocks_team_members" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_team_members_parent_id_idx" ON "pages_blocks_team_members" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_team_members_image_idx" ON "pages_blocks_team_members" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_team_order_idx" ON "pages_blocks_team" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_team_parent_id_idx" ON "pages_blocks_team" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_team_path_idx" ON "pages_blocks_team" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_feature_order_idx" ON "pages_blocks_feature" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_feature_parent_id_idx" ON "pages_blocks_feature" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_feature_path_idx" ON "pages_blocks_feature" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_feature_image_idx" ON "pages_blocks_feature" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_slider_links_order_idx" ON "pages_blocks_slider_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_slider_links_parent_id_idx" ON "pages_blocks_slider_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_slider_items_order_idx" ON "pages_blocks_slider_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_slider_items_parent_id_idx" ON "pages_blocks_slider_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_slider_order_idx" ON "pages_blocks_slider" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_slider_parent_id_idx" ON "pages_blocks_slider" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_slider_path_idx" ON "pages_blocks_slider" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_logos_items_order_idx" ON "pages_blocks_logos_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_logos_items_parent_id_idx" ON "pages_blocks_logos_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_logos_items_image_idx" ON "pages_blocks_logos_items" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_logos_order_idx" ON "pages_blocks_logos" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_logos_parent_id_idx" ON "pages_blocks_logos" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_logos_path_idx" ON "pages_blocks_logos" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_process_slider_items_order_idx" ON "pages_blocks_process_slider_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_process_slider_items_parent_id_idx" ON "pages_blocks_process_slider_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_process_slider_order_idx" ON "pages_blocks_process_slider" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_process_slider_parent_id_idx" ON "pages_blocks_process_slider" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_process_slider_path_idx" ON "pages_blocks_process_slider" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_cta_block_links_order_idx" ON "pages_blocks_cta_block_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_cta_block_links_parent_id_idx" ON "pages_blocks_cta_block_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_hero_links_order_idx" ON "_pages_v_blocks_hero_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_hero_links_parent_id_idx" ON "_pages_v_blocks_hero_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_hero_order_idx" ON "_pages_v_blocks_hero" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_hero_parent_id_idx" ON "_pages_v_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_hero_path_idx" ON "_pages_v_blocks_hero" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_image_order_idx" ON "_pages_v_blocks_image" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_image_parent_id_idx" ON "_pages_v_blocks_image" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_image_path_idx" ON "_pages_v_blocks_image" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_image_image_idx" ON "_pages_v_blocks_image" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_image_callout_callout_link_idx" ON "_pages_v_blocks_image" USING btree ("callout_link_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_image_callout_callout_image_idx" ON "_pages_v_blocks_image" USING btree ("callout_image_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_paragraph_order_idx" ON "_pages_v_blocks_paragraph" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_paragraph_parent_id_idx" ON "_pages_v_blocks_paragraph" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_paragraph_path_idx" ON "_pages_v_blocks_paragraph" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_cards_items_order_idx" ON "_pages_v_blocks_cards_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_cards_items_parent_id_idx" ON "_pages_v_blocks_cards_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_cards_order_idx" ON "_pages_v_blocks_cards" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_cards_parent_id_idx" ON "_pages_v_blocks_cards" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_cards_path_idx" ON "_pages_v_blocks_cards" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_cases_order_idx" ON "_pages_v_blocks_cases" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_cases_parent_id_idx" ON "_pages_v_blocks_cases" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_cases_path_idx" ON "_pages_v_blocks_cases" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_feature_rows_items_order_idx" ON "_pages_v_blocks_feature_rows_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_feature_rows_items_parent_id_idx" ON "_pages_v_blocks_feature_rows_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_feature_rows_order_idx" ON "_pages_v_blocks_feature_rows" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_feature_rows_parent_id_idx" ON "_pages_v_blocks_feature_rows" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_feature_rows_path_idx" ON "_pages_v_blocks_feature_rows" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_feature_list_items_order_idx" ON "_pages_v_blocks_feature_list_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_feature_list_items_parent_id_idx" ON "_pages_v_blocks_feature_list_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_feature_list_order_idx" ON "_pages_v_blocks_feature_list" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_feature_list_parent_id_idx" ON "_pages_v_blocks_feature_list" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_feature_list_path_idx" ON "_pages_v_blocks_feature_list" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_feature_testimonials_items_order_idx" ON "_pages_v_blocks_feature_testimonials_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_feature_testimonials_items_parent_id_idx" ON "_pages_v_blocks_feature_testimonials_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_feature_testimonials_items_author_avatar_idx" ON "_pages_v_blocks_feature_testimonials_items" USING btree ("author_avatar_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_feature_testimonials_items_link_idx" ON "_pages_v_blocks_feature_testimonials_items" USING btree ("link_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_feature_testimonials_order_idx" ON "_pages_v_blocks_feature_testimonials" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_feature_testimonials_parent_id_idx" ON "_pages_v_blocks_feature_testimonials" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_feature_testimonials_path_idx" ON "_pages_v_blocks_feature_testimonials" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_testimonials_items_order_idx" ON "_pages_v_blocks_testimonials_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_testimonials_items_parent_id_idx" ON "_pages_v_blocks_testimonials_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_testimonials_items_image_idx" ON "_pages_v_blocks_testimonials_items" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_testimonials_order_idx" ON "_pages_v_blocks_testimonials" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_testimonials_parent_id_idx" ON "_pages_v_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_testimonials_path_idx" ON "_pages_v_blocks_testimonials" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_team_links_order_idx" ON "_pages_v_blocks_team_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_team_links_parent_id_idx" ON "_pages_v_blocks_team_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_team_members_order_idx" ON "_pages_v_blocks_team_members" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_team_members_parent_id_idx" ON "_pages_v_blocks_team_members" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_team_members_image_idx" ON "_pages_v_blocks_team_members" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_team_order_idx" ON "_pages_v_blocks_team" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_team_parent_id_idx" ON "_pages_v_blocks_team" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_team_path_idx" ON "_pages_v_blocks_team" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_feature_order_idx" ON "_pages_v_blocks_feature" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_feature_parent_id_idx" ON "_pages_v_blocks_feature" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_feature_path_idx" ON "_pages_v_blocks_feature" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_feature_image_idx" ON "_pages_v_blocks_feature" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_slider_links_order_idx" ON "_pages_v_blocks_slider_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_slider_links_parent_id_idx" ON "_pages_v_blocks_slider_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_slider_items_order_idx" ON "_pages_v_blocks_slider_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_slider_items_parent_id_idx" ON "_pages_v_blocks_slider_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_slider_order_idx" ON "_pages_v_blocks_slider" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_slider_parent_id_idx" ON "_pages_v_blocks_slider" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_slider_path_idx" ON "_pages_v_blocks_slider" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_logos_items_order_idx" ON "_pages_v_blocks_logos_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_logos_items_parent_id_idx" ON "_pages_v_blocks_logos_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_logos_items_image_idx" ON "_pages_v_blocks_logos_items" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_logos_order_idx" ON "_pages_v_blocks_logos" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_logos_parent_id_idx" ON "_pages_v_blocks_logos" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_logos_path_idx" ON "_pages_v_blocks_logos" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_process_slider_items_order_idx" ON "_pages_v_blocks_process_slider_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_process_slider_items_parent_id_idx" ON "_pages_v_blocks_process_slider_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_process_slider_order_idx" ON "_pages_v_blocks_process_slider" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_process_slider_parent_id_idx" ON "_pages_v_blocks_process_slider" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_process_slider_path_idx" ON "_pages_v_blocks_process_slider" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_cta_block_links_order_idx" ON "_pages_v_blocks_cta_block_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_cta_block_links_parent_id_idx" ON "_pages_v_blocks_cta_block_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "cases_tags_order_idx" ON "cases_tags" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "cases_tags_parent_idx" ON "cases_tags" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "cases_slug_idx" ON "cases" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "cases_image_idx" ON "cases" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "cases_callout_callout_image_idx" ON "cases" USING btree ("callout_image_id");
  CREATE INDEX IF NOT EXISTS "cases_updated_at_idx" ON "cases" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "cases_created_at_idx" ON "cases" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "cases__status_idx" ON "cases" USING btree ("_status");
  CREATE INDEX IF NOT EXISTS "_cases_v_version_tags_order_idx" ON "_cases_v_version_tags" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "_cases_v_version_tags_parent_idx" ON "_cases_v_version_tags" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "_cases_v_parent_idx" ON "_cases_v" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "_cases_v_version_version_slug_idx" ON "_cases_v" USING btree ("version_slug");
  CREATE INDEX IF NOT EXISTS "_cases_v_version_version_image_idx" ON "_cases_v" USING btree ("version_image_id");
  CREATE INDEX IF NOT EXISTS "_cases_v_version_callout_version_callout_image_idx" ON "_cases_v" USING btree ("version_callout_image_id");
  CREATE INDEX IF NOT EXISTS "_cases_v_version_version_updated_at_idx" ON "_cases_v" USING btree ("version_updated_at");
  CREATE INDEX IF NOT EXISTS "_cases_v_version_version_created_at_idx" ON "_cases_v" USING btree ("version_created_at");
  CREATE INDEX IF NOT EXISTS "_cases_v_version_version__status_idx" ON "_cases_v" USING btree ("version__status");
  CREATE INDEX IF NOT EXISTS "_cases_v_created_at_idx" ON "_cases_v" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "_cases_v_updated_at_idx" ON "_cases_v" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "_cases_v_latest_idx" ON "_cases_v" USING btree ("latest");
  CREATE INDEX IF NOT EXISTS "_cases_v_autosave_idx" ON "_cases_v" USING btree ("autosave");
  CREATE INDEX IF NOT EXISTS "shared_blocks_blocks_cta_block_links_order_idx" ON "shared_blocks_blocks_cta_block_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "shared_blocks_blocks_cta_block_links_parent_id_idx" ON "shared_blocks_blocks_cta_block_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "shared_blocks_blocks_logos_items_order_idx" ON "shared_blocks_blocks_logos_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "shared_blocks_blocks_logos_items_parent_id_idx" ON "shared_blocks_blocks_logos_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "shared_blocks_blocks_logos_items_image_idx" ON "shared_blocks_blocks_logos_items" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "shared_blocks_blocks_logos_order_idx" ON "shared_blocks_blocks_logos" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "shared_blocks_blocks_logos_parent_id_idx" ON "shared_blocks_blocks_logos" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "shared_blocks_blocks_logos_path_idx" ON "shared_blocks_blocks_logos" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "settings_avatars_order_idx" ON "settings_avatars" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "settings_avatars_parent_id_idx" ON "settings_avatars" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "settings_avatars_image_idx" ON "settings_avatars" USING btree ("image_id");
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_cases_fk" FOREIGN KEY ("cases_id") REFERENCES "public"."cases"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "settings" ADD CONSTRAINT "settings_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_cases_id_idx" ON "payload_locked_documents_rels" USING btree ("cases_id");
  CREATE INDEX IF NOT EXISTS "settings_logo_idx" ON "settings" USING btree ("logo_id");
  ALTER TABLE "pages_blocks_cta_block" DROP COLUMN IF EXISTS "image_id";
  ALTER TABLE "pages_blocks_cta_block" DROP COLUMN IF EXISTS "link_type";
  ALTER TABLE "pages_blocks_cta_block" DROP COLUMN IF EXISTS "link_new_tab";
  ALTER TABLE "pages_blocks_cta_block" DROP COLUMN IF EXISTS "link_url";
  ALTER TABLE "pages_blocks_cta_block" DROP COLUMN IF EXISTS "link_label";
  ALTER TABLE "_pages_v_blocks_cta_block" DROP COLUMN IF EXISTS "image_id";
  ALTER TABLE "_pages_v_blocks_cta_block" DROP COLUMN IF EXISTS "link_type";
  ALTER TABLE "_pages_v_blocks_cta_block" DROP COLUMN IF EXISTS "link_new_tab";
  ALTER TABLE "_pages_v_blocks_cta_block" DROP COLUMN IF EXISTS "link_url";
  ALTER TABLE "_pages_v_blocks_cta_block" DROP COLUMN IF EXISTS "link_label";
  ALTER TABLE "shared_blocks_blocks_cta_block" DROP COLUMN IF EXISTS "image_id";
  ALTER TABLE "shared_blocks_blocks_cta_block" DROP COLUMN IF EXISTS "link_type";
  ALTER TABLE "shared_blocks_blocks_cta_block" DROP COLUMN IF EXISTS "link_new_tab";
  ALTER TABLE "shared_blocks_blocks_cta_block" DROP COLUMN IF EXISTS "link_url";
  ALTER TABLE "shared_blocks_blocks_cta_block" DROP COLUMN IF EXISTS "link_label";
  DROP TYPE "public"."enum_pages_blocks_cta_block_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_cta_block_link_type";
  DROP TYPE "public"."enum_shared_blocks_blocks_cta_block_link_type";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_cta_block_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_block_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_shared_blocks_blocks_cta_block_link_type" AS ENUM('reference', 'custom');
  ALTER TABLE "pages_blocks_hero_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_image" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_paragraph" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_cards_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_cases" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_feature_rows_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_feature_rows" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_feature_list_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_feature_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_feature_testimonials_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_feature_testimonials" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_testimonials_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_testimonials" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_team_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_team_members" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_team" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_feature" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_slider_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_slider_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_slider" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_logos_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_logos" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_process_slider_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_process_slider" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_cta_block_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_hero_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_image" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_paragraph" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_cards_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_cases" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_feature_rows_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_feature_rows" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_feature_list_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_feature_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_feature_testimonials_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_feature_testimonials" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_testimonials_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_testimonials" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_team_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_team_members" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_team" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_feature" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_slider_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_slider_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_slider" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_logos_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_logos" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_process_slider_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_process_slider" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_cta_block_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "cases_tags" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "cases" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_cases_v_version_tags" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_cases_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "shared_blocks_blocks_cta_block_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "shared_blocks_blocks_logos_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "shared_blocks_blocks_logos" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "settings_avatars" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_hero_links" CASCADE;
  DROP TABLE "pages_blocks_hero" CASCADE;
  DROP TABLE "pages_blocks_image" CASCADE;
  DROP TABLE "pages_blocks_paragraph" CASCADE;
  DROP TABLE "pages_blocks_cards_items" CASCADE;
  DROP TABLE "pages_blocks_cards" CASCADE;
  DROP TABLE "pages_blocks_cases" CASCADE;
  DROP TABLE "pages_blocks_feature_rows_items" CASCADE;
  DROP TABLE "pages_blocks_feature_rows" CASCADE;
  DROP TABLE "pages_blocks_feature_list_items" CASCADE;
  DROP TABLE "pages_blocks_feature_list" CASCADE;
  DROP TABLE "pages_blocks_feature_testimonials_items" CASCADE;
  DROP TABLE "pages_blocks_feature_testimonials" CASCADE;
  DROP TABLE "pages_blocks_testimonials_items" CASCADE;
  DROP TABLE "pages_blocks_testimonials" CASCADE;
  DROP TABLE "pages_blocks_team_links" CASCADE;
  DROP TABLE "pages_blocks_team_members" CASCADE;
  DROP TABLE "pages_blocks_team" CASCADE;
  DROP TABLE "pages_blocks_feature" CASCADE;
  DROP TABLE "pages_blocks_slider_links" CASCADE;
  DROP TABLE "pages_blocks_slider_items" CASCADE;
  DROP TABLE "pages_blocks_slider" CASCADE;
  DROP TABLE "pages_blocks_logos_items" CASCADE;
  DROP TABLE "pages_blocks_logos" CASCADE;
  DROP TABLE "pages_blocks_process_slider_items" CASCADE;
  DROP TABLE "pages_blocks_process_slider" CASCADE;
  DROP TABLE "pages_blocks_cta_block_links" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_links" CASCADE;
  DROP TABLE "_pages_v_blocks_hero" CASCADE;
  DROP TABLE "_pages_v_blocks_image" CASCADE;
  DROP TABLE "_pages_v_blocks_paragraph" CASCADE;
  DROP TABLE "_pages_v_blocks_cards_items" CASCADE;
  DROP TABLE "_pages_v_blocks_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_cases" CASCADE;
  DROP TABLE "_pages_v_blocks_feature_rows_items" CASCADE;
  DROP TABLE "_pages_v_blocks_feature_rows" CASCADE;
  DROP TABLE "_pages_v_blocks_feature_list_items" CASCADE;
  DROP TABLE "_pages_v_blocks_feature_list" CASCADE;
  DROP TABLE "_pages_v_blocks_feature_testimonials_items" CASCADE;
  DROP TABLE "_pages_v_blocks_feature_testimonials" CASCADE;
  DROP TABLE "_pages_v_blocks_testimonials_items" CASCADE;
  DROP TABLE "_pages_v_blocks_testimonials" CASCADE;
  DROP TABLE "_pages_v_blocks_team_links" CASCADE;
  DROP TABLE "_pages_v_blocks_team_members" CASCADE;
  DROP TABLE "_pages_v_blocks_team" CASCADE;
  DROP TABLE "_pages_v_blocks_feature" CASCADE;
  DROP TABLE "_pages_v_blocks_slider_links" CASCADE;
  DROP TABLE "_pages_v_blocks_slider_items" CASCADE;
  DROP TABLE "_pages_v_blocks_slider" CASCADE;
  DROP TABLE "_pages_v_blocks_logos_items" CASCADE;
  DROP TABLE "_pages_v_blocks_logos" CASCADE;
  DROP TABLE "_pages_v_blocks_process_slider_items" CASCADE;
  DROP TABLE "_pages_v_blocks_process_slider" CASCADE;
  DROP TABLE "_pages_v_blocks_cta_block_links" CASCADE;
  DROP TABLE "cases_tags" CASCADE;
  DROP TABLE "cases" CASCADE;
  DROP TABLE "_cases_v_version_tags" CASCADE;
  DROP TABLE "_cases_v" CASCADE;
  DROP TABLE "shared_blocks_blocks_cta_block_links" CASCADE;
  DROP TABLE "shared_blocks_blocks_logos_items" CASCADE;
  DROP TABLE "shared_blocks_blocks_logos" CASCADE;
  DROP TABLE "settings_avatars" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_cases_fk";
  
  ALTER TABLE "settings" DROP CONSTRAINT "settings_logo_id_media_id_fk";
  
  DROP INDEX IF EXISTS "payload_locked_documents_rels_cases_id_idx";
  DROP INDEX IF EXISTS "settings_logo_idx";
  ALTER TABLE "shared_blocks_blocks_cta_block" ALTER COLUMN "text" SET NOT NULL;
  ALTER TABLE "pages_blocks_cta_block" ADD COLUMN "image_id" integer;
  ALTER TABLE "pages_blocks_cta_block" ADD COLUMN "link_type" "enum_pages_blocks_cta_block_link_type" DEFAULT 'reference';
  ALTER TABLE "pages_blocks_cta_block" ADD COLUMN "link_new_tab" boolean;
  ALTER TABLE "pages_blocks_cta_block" ADD COLUMN "link_url" varchar;
  ALTER TABLE "pages_blocks_cta_block" ADD COLUMN "link_label" varchar;
  ALTER TABLE "_pages_v_blocks_cta_block" ADD COLUMN "image_id" integer;
  ALTER TABLE "_pages_v_blocks_cta_block" ADD COLUMN "link_type" "enum__pages_v_blocks_cta_block_link_type" DEFAULT 'reference';
  ALTER TABLE "_pages_v_blocks_cta_block" ADD COLUMN "link_new_tab" boolean;
  ALTER TABLE "_pages_v_blocks_cta_block" ADD COLUMN "link_url" varchar;
  ALTER TABLE "_pages_v_blocks_cta_block" ADD COLUMN "link_label" varchar;
  ALTER TABLE "shared_blocks_blocks_cta_block" ADD COLUMN "image_id" integer;
  ALTER TABLE "shared_blocks_blocks_cta_block" ADD COLUMN "link_type" "enum_shared_blocks_blocks_cta_block_link_type" DEFAULT 'reference' NOT NULL;
  ALTER TABLE "shared_blocks_blocks_cta_block" ADD COLUMN "link_new_tab" boolean;
  ALTER TABLE "shared_blocks_blocks_cta_block" ADD COLUMN "link_url" varchar;
  ALTER TABLE "shared_blocks_blocks_cta_block" ADD COLUMN "link_label" varchar;
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_cta_block" ADD CONSTRAINT "pages_blocks_cta_block_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_cta_block" ADD CONSTRAINT "_pages_v_blocks_cta_block_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "shared_blocks_blocks_cta_block" ADD CONSTRAINT "shared_blocks_blocks_cta_block_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_blocks_cta_block_image_idx" ON "pages_blocks_cta_block" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_cta_block_image_idx" ON "_pages_v_blocks_cta_block" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "shared_blocks_blocks_cta_block_image_idx" ON "shared_blocks_blocks_cta_block" USING btree ("image_id");
  ALTER TABLE "pages_blocks_cta_block" DROP COLUMN IF EXISTS "bg_color";
  ALTER TABLE "_pages_v_blocks_cta_block" DROP COLUMN IF EXISTS "bg_color";
  ALTER TABLE "shared_blocks_blocks_cta_block" DROP COLUMN IF EXISTS "bg_color";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "cases_id";
  ALTER TABLE "settings" DROP COLUMN IF EXISTS "logo_id";
  ALTER TABLE "settings" DROP COLUMN IF EXISTS "company_info";
  DROP TYPE "public"."enum_pages_blocks_hero_links_link_type";
  DROP TYPE "public"."enum_pages_blocks_hero_text_align";
  DROP TYPE "public"."enum_pages_blocks_hero_bg_color";
  DROP TYPE "public"."enum_pages_blocks_paragraph_bg_color";
  DROP TYPE "public"."enum_pages_blocks_cards_bg_color";
  DROP TYPE "public"."enum_pages_blocks_cases_link_type";
  DROP TYPE "public"."enum_pages_blocks_feature_rows_bg_color";
  DROP TYPE "public"."enum_pages_blocks_feature_list_items_link_type";
  DROP TYPE "public"."enum_pages_blocks_feature_list_link_type";
  DROP TYPE "public"."enum_pages_blocks_feature_testimonials_bg_color";
  DROP TYPE "public"."enum_pages_blocks_testimonials_bg_color";
  DROP TYPE "public"."enum_pages_blocks_team_links_link_type";
  DROP TYPE "public"."enum_pages_blocks_team_bg_color";
  DROP TYPE "public"."enum_pages_blocks_feature_variant";
  DROP TYPE "public"."enum_pages_blocks_slider_links_link_type";
  DROP TYPE "public"."enum_pages_blocks_slider_bg_color";
  DROP TYPE "public"."enum_pages_blocks_logos_bg_color";
  DROP TYPE "public"."enum_pages_blocks_cta_block_links_link_type";
  DROP TYPE "public"."enum_pages_blocks_cta_block_bg_color";
  DROP TYPE "public"."enum__pages_v_blocks_hero_links_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_hero_text_align";
  DROP TYPE "public"."enum__pages_v_blocks_hero_bg_color";
  DROP TYPE "public"."enum__pages_v_blocks_paragraph_bg_color";
  DROP TYPE "public"."enum__pages_v_blocks_cards_bg_color";
  DROP TYPE "public"."enum__pages_v_blocks_cases_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_feature_rows_bg_color";
  DROP TYPE "public"."enum__pages_v_blocks_feature_list_items_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_feature_list_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_feature_testimonials_bg_color";
  DROP TYPE "public"."enum__pages_v_blocks_testimonials_bg_color";
  DROP TYPE "public"."enum__pages_v_blocks_team_links_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_team_bg_color";
  DROP TYPE "public"."enum__pages_v_blocks_feature_variant";
  DROP TYPE "public"."enum__pages_v_blocks_slider_links_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_slider_bg_color";
  DROP TYPE "public"."enum__pages_v_blocks_logos_bg_color";
  DROP TYPE "public"."enum__pages_v_blocks_cta_block_links_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_cta_block_bg_color";
  DROP TYPE "public"."enum_cases_tags";
  DROP TYPE "public"."enum_cases_status";
  DROP TYPE "public"."enum__cases_v_version_tags";
  DROP TYPE "public"."enum__cases_v_version_status";
  DROP TYPE "public"."enum_shared_blocks_blocks_cta_block_links_link_type";
  DROP TYPE "public"."enum_shared_blocks_blocks_cta_block_bg_color";
  DROP TYPE "public"."enum_shared_blocks_blocks_logos_bg_color";`)
}
