import type { Media } from "@payload-types"
import Image from "next/image"
import React from "react"

interface ImageBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  fill?: boolean
  lazyload?: boolean
  media?: Media | number
  quality?: number
  sizes?: string
  disableBlurhash?: boolean
}

export const ImageBox: React.FC<ImageBoxProps> = ({
  media,
  fill,
  sizes,
  lazyload = true,
  quality = 85,
  disableBlurhash = false,
  ...rest
}) => {
  if (!media || typeof media === "number") {
    return null
  }

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
      placeholder={!disableBlurhash && media.blurhash ? "blur" : "empty"}
      blurDataURL={(!disableBlurhash && media.blurhash) || undefined}
      {...rest}
    />
  )
}
