import { getCachedGlobal } from "@/utils/getGlobals"
import { notFound } from "next/navigation"
import { Suspense } from "react"
import { BlogCategories } from "@/components/blog-categories"
import BlogPostCard from "@/components/BlogPostCard"
import { Pagination } from "@/components/Pagination"
import { getPageByPath, getPaginatedPosts } from "@/lib/payload"
import { getPayload } from "payload"
import config from "@payload-config"
import { Badge } from "@/components/ui/badge"
import { getDescription, getOgImage } from "@/utils/seo"
import { mergeOpenGraph } from "@/utils/mergeOpenGraph"
import { postsPerPage } from "@/config"

type Args = {
  params: Promise<{
    pagenumber: string
  }>
}

export default async function Blog({ params }: Args) {
  const { pagenumber } = await params
  const sanitizedPageNumber = Number(pagenumber)

  if (!Number.isInteger(sanitizedPageNumber)) {
    notFound()
  }

  const { title, description } = await getCachedGlobal("blogSettings")()
  const posts = await getPaginatedPosts({ pagenumber: sanitizedPageNumber })

  return (
    <div className="py-16">
      <div className="mb-16 text-center">
        <Badge className="mb-8">Blog</Badge>
        <h1 className="mb-6">{title}</h1>
        <p>{description}</p>
      </div>

      <div className="mb-8">
        <BlogCategories />
      </div>

      <Suspense fallback={null}>
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
            {posts?.docs.map((post, index) => (
              <BlogPostCard key={index} post={post} />
            ))}
          </div>

          <div>
            {posts.totalPages > 1 && posts.page && (
              <Pagination page={posts.page} totalPages={posts.totalPages} />
            )}
          </div>
        </div>
      </Suspense>
    </div>
  )
}

export async function generateMetadata({ params }: Args) {
  const { pagenumber } = await params
  const sanitizedPageNumber = Number(pagenumber)

  if (!Number.isInteger(sanitizedPageNumber)) {
    notFound()
  }

  const page = await getPageByPath("/blog")
  const settings = await getCachedGlobal("settings")()

  if (!page) {
    notFound()
  }

  const pageDescription = getDescription(page)

  return {
    title: `Blog ${sanitizedPageNumber ? ` - Page ${sanitizedPageNumber}` : ""}`,
    ...(pageDescription ? { description: pageDescription } : {}),
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/blog/page/${sanitizedPageNumber}`,
    },
    openGraph: await mergeOpenGraph({
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/blog/page/${sanitizedPageNumber}`,
      images: getOgImage(page.seo?.image),
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

  const { totalDocs } = await payload.count({
    collection: "posts",
    overrideAccess: false,
  })

  const totalPages = Math.ceil(totalDocs / postsPerPage)
  const pages: { pagenumber: string }[] = []

  for (let i = 1; i <= totalPages; i++) {
    pages.push({ pagenumber: String(i) })
  }

  return pages
}
