import { getLatestPosts, getPostBySlug } from "@/lib/payload"
import RichText from "@/components/RichText"
import { LivePreviewListener } from "@/components/LivePreviewListener"
import { draftMode } from "next/headers"
import { Suspense } from "react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Link from "next/link"
import { ImageBox } from "@/components/ImageBox"
import { Media, User } from "@payload-types"
import BlogPostCard from "@/components/BlogPostCard"
import { Button } from "@/components/ui/button"
import { getPayload } from "payload"
import config from "@payload-config"
import { format } from "date-fns"
import { BlogShareButtons } from "@/components/blog-share-buttons"
import { cn } from "@/lib/utils"
import { mergeOpenGraph } from "@/utils/mergeOpenGraph"
import { getOgImage } from "@/utils/seo"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import Breadcrumbs from "@/components/breadcrumbs"
import AnimatedButton from "@/components/interface/AnimatedButton"

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

/**
 * BlogRelatedPosts
 * @constructor
 */
async function BlogRelatedPosts({ currentPostSlug }: { currentPostSlug: string }) {
  const latestPosts = await getLatestPosts(currentPostSlug)

  return (
    <div>
      <div>
        <div className="mb-4 flex items-center gap-4">
          <h2>Overige berichten</h2>
          <AnimatedButton asChild variant="light">
            <Link href={`/blog`}>Bekijke alle</Link>
          </AnimatedButton>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
        {latestPosts.map((post, index) => (
          <BlogPostCard key={index} post={post} />
        ))}
      </div>
    </div>
  )
}

/**
 * Blog
 * @param params
 * @constructor
 */
export default async function Blog({ params }: PageProps) {
  const { isEnabled: draft } = await draftMode()

  const slug = (await params).slug ?? ""
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  console.log(post)

  return (
    <div>
      {draft && <LivePreviewListener />}

      <section className="relative my-sm lg:my-lg">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-12 2xl:px-16">
          <div className="pt-16 lg:pt-24">
            <div className="max-w-4xl">
              <div className="mb-8">
                <Breadcrumbs />
              </div>
              <h1 className="text-foreground">{post.title}</h1>
            </div>
            <div className="mt-sm">
              <div className="flex items-center">
                {post.author && (post.author as User).avatar ? (
                  <div className="mr-4 shrink-0">
                    <ImageBox
                      className="w-10 h-10 rounded-full"
                      media={(post.author as User).avatar as Media}
                      sizes="96px"
                    />
                  </div>
                ) : (
                  <div className="mr-4 shrink-0">
                    <div className="w-10 h-10 bg-tertiary rounded-full" />
                  </div>
                )}
                <div className="flex w-full items-center justify-between">
                  <div>
                    {post.author && (
                      <p className="leading-none">{(post.author as User).name}</p>
                    )}
                    <div className="flex items-center">
                      <p>{format(new Date(post.publishedAt!), "dd/MM/yyyy")}</p>
                      {post.readingTime && (
                        <>
                          <span className="mx-2">•</span>
                          <p>{post.readingTime} minuten leestijd</p>
                        </>
                      )}
                    </div>
                  </div>
                  <div>
                    <BlogShareButtons
                      url={`${process.env.NEXT_PUBLIC_SITE_URL}/blog/${post.slug}`}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="my-sm lg:my-lg">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-12 2xl:px-16">
          <div>
            {post.heroImage && (
              <div className="relative h-[500px]">
                <ImageBox
                  fill
                  className="rounded-[20px]"
                  media={post.heroImage as Media}
                  sizes="(max-width: 639px) 375px, (max-width: 767px) 500px, (max-width: 1023px) 768px, 1920px"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="my-sm lg:my-lg">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-12 2xl:px-16">
          {post.content && <RichText data={post.content} />}
        </div>
      </section>

      <hr />

      <section className="my-sm lg:my-lg">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-12 2xl:px-16">
          <Suspense fallback={null}>
            <BlogRelatedPosts currentPostSlug={slug} />
          </Suspense>
        </div>
      </section>
    </div>
  )
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const slug = (await params).slug ?? ""
  const post = await getPostBySlug(slug)

  if (!post) {
    return {}
  }

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${post.slug}`,
    },
    openGraph: await mergeOpenGraph({
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${post.slug}`,
      images: getOgImage(post.heroImage),
    }),
  }
}

export async function generateStaticParams() {
  if (process.env.NODE_ENV === "development") {
    return []
  }
  const payload = await getPayload({
    config,
  })

  const posts = await payload.find({
    collection: "posts",
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
    where: {
      publishedAt: { less_than: new Date().toISOString() },
    },
  })

  return posts.docs.map(({ slug }) => {
    return { slug }
  })
}
