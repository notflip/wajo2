import { getCachedGlobal } from "@/utils/getGlobals"
import { getCachedPageByPath, getPaginatedPosts } from "@/lib/payload"
import { BlogPage } from "@/components/blog-page"
import { getDescription, getOgImage, getTitle } from "@/utils/seo"
import { notFound } from "next/navigation"
import { mergeOpenGraph } from "@/utils/mergeOpenGraph"

export default async function Blog() {
  const { title, description } = await getCachedGlobal("blogSettings")()
  const posts = await getPaginatedPosts({})

  // @TODO get rid of blogSettings and use the getPageByPath('/blog').blocks[0] (pseudo)
  const page = await getCachedPageByPath("/blog")

  if (!page) {
    notFound()
  }

  // const block = page.blocks.find(p => p.blockType === "blogSomething")
  return <BlogPage title={title} description={description} posts={posts} />
}

export async function generateMetadata() {
  const page = await getCachedPageByPath("/blog")

  if (!page) {
    return {}
  }

  return {
    title: getTitle(page),
    ...(getDescription(page) ? { description: getDescription(page) } : {}),
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}${page.slug}`,
    },
    openGraph: await mergeOpenGraph({
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/blog`,
      images: getOgImage(page.seo?.image),
    }),
  }
}
