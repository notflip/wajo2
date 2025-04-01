import { Badge } from "@/components/ui/badge"
import { BlogCategories } from "@/components/blog-categories"
import BlogPostCard from "@/components/BlogPostCard"
import { Pagination } from "@/components/Pagination"
import { Suspense } from "react"
import { PaginatedDocs } from "payload"

type BlogPageProps = {
  title: string
  description?: string
  posts: PaginatedDocs
  category?: string
}

export async function BlogPage(props: BlogPageProps) {
  const { title, description, posts, category } = props

  return (
    <section className="pt-[3rem] lg:pt-[6rem] pb-[3rem] lg:pb-[3rem]">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8 2xl:px-16">
        <div className="mb-16 text-center">
          <Badge className="mb-8">Blog</Badge>
          <h1 className="mb-6">{title}</h1>
          {description && <p>{description}</p>}
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
                <Pagination
                  page={posts.page}
                  totalPages={posts.totalPages}
                  category={category}
                />
              )}
            </div>
          </div>
        </Suspense>
      </div>
    </section>
  )
}
