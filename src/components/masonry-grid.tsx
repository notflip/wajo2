import { ImageGrid, Media } from "@payload-types"
import Image from "next/image"

export default function MasonryGrid({ items }: Partial<ImageGrid>) {
  return (
    <div className="columns-1 md:columns-2 xl:columns-3 gap-4 space-y-4">
      {items &&
        items.map((item, index) => {
          const media = item.image as Media

          if (!media) {
            return null
          }

          return (
            <Image
              width={media.width ?? undefined}
              height={media.height ?? undefined}
              key={index}
              alt={media.alt ?? "grid image"}
              src={`${media.url!}?${media.updatedAt}`}
              className="rounded-lg"
              sizes="500px"
            />
          )
        })}
    </div>
  )
}
