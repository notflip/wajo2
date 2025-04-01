import { ImageBox } from "@/components/ImageBox"
import { Media, Post, PostCategory, User } from "@payload-types"
import { format } from "date-fns"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

export default function BlogPostCard({ post }: { post: Post }) {
  return (
    <div className="bg-secondary rounded-[20px] overflow-hidden">
      <Link href={`/blog/${post.slug}`} className="w-full max-w-full">
        <div className="w-full overflow-hidden">
          {post.heroImage && (
            <ImageBox
              className="aspect-[3/2] size-full"
              media={post.heroImage as Media}
              sizes="600px"
            />
          )}
        </div>
      </Link>
      <div className="px-5 py-6 md:p-6">
        {post.category && (
          <Badge className="bg-tertiary mb-4">
            {(post.category as PostCategory).title}
          </Badge>
        )}
        <Link href={`/blog/${post.slug}`} className="block mb-4">
          <h5>{post.title}</h5>
        </Link>
        <p>{post.description}</p>
        {post.author && (
          <div className="mt-6 flex items-center">
            {(post.author as User).avatar ? (
              <div className="mr-4 shrink-0">
                <ImageBox
                  className="w-12 h-12 rounded-full border"
                  media={(post.author as User).avatar as Media}
                  sizes="96px"
                />
              </div>
            ) : (
              <div className="mr-4 shrink-0">
                <div className="w-12 h-12 bg-tertiary rounded-full border" />
              </div>
            )}
            <div>
              <p>{(post.author as User).name}</p>
              <div className="flex items-center">
                <p>{format(new Date(post.publishedAt!), "dd/MM/yyyy")}</p>
                {post.readingTime && (
                  <>
                    <span className="mx-2">•</span>
                    <p className="text-sm">
                      {post.readingTime} minuten leestijd
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
