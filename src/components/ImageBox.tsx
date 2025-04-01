import type { Media } from "@payload-types"
import Image from "next/image"
import React from "react"

interface ImageBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  fill?: boolean
  lazyload?: boolean
  media: Media
  quality?: number
  sizes?: string
}

export const ImageBox: React.FC<ImageBoxProps> = ({
  media,
  fill,
  sizes,
  lazyload = true,
  quality = 85,
  ...rest
}) => {
  const { width: imageWidth, height: imageHeight } = media
  const width = imageWidth ?? undefined
  const height = imageHeight ?? undefined

  const objectPosition =
    media.focalX != null && media.focalY != null
      ? `${media.focalX}% ${media.focalY}%`
      : "center"

  return (
    <Image
      src={`${media.url!}?${media.updatedAt}`}
      alt={media.alt ?? ""}
      quality={quality}
      fill={fill}
      width={!fill ? width : undefined}
      height={!fill ? height : undefined}
      sizes={sizes}
      loading={lazyload ? "lazy" : "eager"}
      style={{
        objectFit: "cover",
        objectPosition,
      }}
      placeholder={media.blurhash ? "blur" : "empty"}
      blurDataURL={media.blurhash || undefined}
      {...rest}
    />
  )
}
