import { NextRequest, NextResponse } from "next/server"
import { revalidatePath, revalidateTag } from "next/cache"
import { getPayload } from "payload"
import config from "@payload-config"

export async function POST(request: NextRequest) {
  try {
    // Optional: Add a secret token for security
    const authHeader = request.headers.get("authorization")
    const token = request.headers.get("x-revalidate-token")

    // Check for authorization (either Bearer token or x-revalidate-token header)
    const secret = process.env.REVALIDATE_SECRET_TOKEN
    if (secret) {
      const providedToken = authHeader?.replace("Bearer ", "") || token
      if (providedToken !== secret) {
        return NextResponse.json(
          { error: "Unauthorized" },
          { status: 401 }
        )
      }
    }

    const body = await request.json().catch(() => ({}))
    const { path, tag, type = "all" } = body

    // If specific path is provided, revalidate that path
    if (path) {
      revalidatePath(path)
      return NextResponse.json(
        {
          revalidated: true,
          message: `Revalidated path: ${path}`,
          now: Date.now()
        },
        { status: 200 }
      )
    }

    // If specific tag is provided, revalidate that tag
    if (tag) {
      revalidateTag(tag)
      return NextResponse.json(
        {
          revalidated: true,
          message: `Revalidated tag: ${tag}`,
          now: Date.now()
        },
        { status: 200 }
      )
    }

    // Otherwise, revalidate everything based on type
    const payload = await getPayload({ config })

    const revalidated = {
      pages: [] as string[],
      posts: [] as string[],
      globals: [] as string[],
    }

    // Revalidate all pages
    if (type === "all" || type === "pages") {
      const pages = await payload.find({
        collection: "pages",
        limit: 1000,
        where: {
          _status: {
            equals: "published",
          },
        },
      })

      for (const page of pages.docs) {
        const pagePath = page.path === "/home" ? "/" : `${page.path}`
        revalidatePath(pagePath)
        revalidated.pages.push(pagePath)
      }
    }

    // Revalidate all blog posts
    if (type === "all" || type === "posts") {
      const posts = await payload.find({
        collection: "posts",
        limit: 1000,
        where: {
          _status: {
            equals: "published",
          },
        },
      })

      for (const post of posts.docs) {
        const postPath = `/blog/${post.slug}`
        revalidatePath(postPath)
        revalidated.posts.push(postPath)
      }

      // Also revalidate the blog index page
      revalidatePath("/blog")
      revalidated.pages.push("/blog")
    }

    // Revalidate all global tags
    if (type === "all" || type === "globals") {
      const globalSlugs = ["settings", "blog-settings", "footer", "navigation-main"]

      for (const slug of globalSlugs) {
        revalidateTag(`global_${slug}`)
        revalidated.globals.push(`global_${slug}`)
      }

      // Revalidate redirects
      revalidateTag("global_redirects")
      revalidated.globals.push("global_redirects")
    }

    // Revalidate the homepage and common paths
    if (type === "all") {
      revalidatePath("/", "layout")
      revalidated.pages.push("/ (layout)")
    }

    return NextResponse.json(
      {
        revalidated: true,
        message: "Cache cleared successfully",
        details: revalidated,
        now: Date.now(),
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Revalidation error:", error)
    return NextResponse.json(
      {
        error: "Failed to revalidate cache",
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    )
  }
}

// Also support GET requests for simple revalidation
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const secret = searchParams.get("secret")
    const path = searchParams.get("path")
    const tag = searchParams.get("tag")
    const type = searchParams.get("type") || "all"

    // Check secret token if configured
    const secretToken = process.env.REVALIDATE_SECRET_TOKEN
    if (secretToken && secret !== secretToken) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    // Revalidate specific path
    if (path) {
      revalidatePath(path)
      return NextResponse.json(
        {
          revalidated: true,
          message: `Revalidated path: ${path}`,
          now: Date.now()
        },
        { status: 200 }
      )
    }

    // Revalidate specific tag
    if (tag) {
      revalidateTag(tag)
      return NextResponse.json(
        {
          revalidated: true,
          message: `Revalidated tag: ${tag}`,
          now: Date.now()
        },
        { status: 200 }
      )
    }

    // For GET requests without specific path/tag, trigger full revalidation
    // by making a POST request to ourselves
    const url = new URL(request.url)
    const postResponse = await fetch(`${url.origin}/api/revalidate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(secretToken ? { "x-revalidate-token": secretToken } : {}),
      },
      body: JSON.stringify({ type }),
    })

    return postResponse
  } catch (error) {
    console.error("Revalidation error:", error)
    return NextResponse.json(
      {
        error: "Failed to revalidate cache",
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    )
  }
}
