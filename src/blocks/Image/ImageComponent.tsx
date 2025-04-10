import { Image as PayloadImage, Media, Case } from "@payload-types"
import { ImageBox } from "@/components/ImageBox"
import Link from "next/link"
import { HiOutlineArrowUpRight } from "react-icons/hi2"
import { cn } from "@/lib/utils"
import { bgColorMap, bgGradientMap, bgGradientMapAfter } from "@/blocks/Blocks"
import React from "react"

export type ImageComponentWithBlock = PayloadImage & {
  nextBgColor: string
  prevBgColor: string
  index: number
}

export const ImageComponent: React.FC<ImageComponentWithBlock> = (props) => {
  const { image, callout, nextBgColor, prevBgColor } = props

  return (
    <section
      className={cn(
        bgGradientMap[nextBgColor],
        bgGradientMapAfter[prevBgColor],
        "relative pt-[3rem] pb-[3rem]",
        prevBgColor && "-mt-[3rem]",
      )}
    >
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8 2xl:px-16">
        <div className="relative h-[350px] md:h-[500px]">
          {image && (
            <ImageBox
              sizes="(max-width: 639px) 375px, (max-width: 767px) 500px, (max-width: 1023px) 768px, 1920px"
              fill
              className="rounded-[16px]"
              media={image as Media}
            />
          )}

          {callout?.content && (
            <div className="absolute max-w-[300px] right-8 bottom-8 bg-white p-4 rounded-[12px]">
              <Callout callout={callout} />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export const Callout: React.FC<{ callout: any }> = ({ callout }: any) => {
  return (
    <div className="flex gap-4">
      {callout?.image && (
        <ImageBox
          sizes="60px"
          className="w-[60px] h-[60px] rounded-[12px]"
          media={callout?.image as Media}
        />
      )}
      {callout?.content && (
        <div className="flex flex-col gap-3 items-end">
          <p className="text-caption">{callout?.content}</p>
          {callout?.link && (
            <Link
              href={`/cases/${callout?.link.slug}`}
              className="block px-4 py-1.5 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <HiOutlineArrowUpRight size="18" />
            </Link>
          )}
        </div>
      )}
    </div>
  )
}
