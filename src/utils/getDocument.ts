import type { Config } from "@payload-types"
import { unstable_cache } from "next/cache"
import config from "@payload-config"
import { getPayload } from "payload"

type Collection = keyof Config["collections"]

async function getDocument(collection: Collection, slug: string, depth = 0) {
  const payload = await getPayload({ config })

  const page = await payload.find({
    collection,
    depth,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return page.docs[0]
}

/**
 * Returns a unstable_cache function mapped with the cache tag for the slug
 */
export const getCachedDocument = (collection: Collection, slug: string) =>
  unstable_cache(
    async () => getDocument(collection, slug),
    [collection, slug],
    {
      tags: [`${collection}_${slug}`],
    },
  )
