import { getCachedGlobal } from "@/utils/getGlobals"
import { getPageByPath, getPaginatedPosts } from "@/lib/payload"
import { getPayload } from "payload"
import config from "@payload-config"
import { BlogPage } from "@/components/blog-page"
import { getDescription, getOgImage } from "@/utils/seo"
import { notFound } from "next/navigation"
import { mergeOpenGraph } from "@/utils/mergeOpenGraph"

type Args = {
  params: Promise<{
    category: string
  }>
}

export default async function Blog({ params }: Args) {
  const { category } = await params
  const { title, description } = await getCachedGlobal("blogSettings")()
  const posts = await getPaginatedPosts({ category })

  return (
    <BlogPage
      title={title}
      description={description}
      posts={posts}
      category={category}
    />
  )
}

export async function generateMetadata({ params }: Args) {
  const { category } = await params

  const page = await getPageByPath("/blog")

  if (!page) {
    notFound()
  }

  const pageDescription = getDescription(page)

  return {
    title: `Blog ${category.charAt(0).toUpperCase() + category.slice(1)}`,
    ...(pageDescription ? { description: pageDescription } : {}),
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/blog/categorie/${category}`,
    },
    openGraph: await mergeOpenGraph({
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/blog/categorie/${category}`,
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

  const postCategories = await payload.find({
    collection: "postCategories",
    draft: false,
    limit: 1000,
    pagination: false,
    select: {
      slug: true,
    },
  })

  return postCategories.docs.map(({ slug }) => ({ category: slug }))
}
