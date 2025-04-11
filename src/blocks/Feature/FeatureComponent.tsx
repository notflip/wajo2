import { Feature, Media } from "@payload-types"
import { ImageBox } from "@/components/ImageBox"
import { cn } from "@/lib/utils"
import RichText from "@/components/RichText"
import Badge from "@/components/badge"

export const bgColorMap: Record<string, string> = {
  secondary: "bg-secondary",
}

export type FeatureWithIndex = Feature & {
  index: number
}

export const FeatureComponent: React.FC<FeatureWithIndex> = (props) => {
  const { subtitle, title, content, image, variant, index: blockIndex } = props

  return (
    <section className="py-[3rem] lg:py-[6rem]">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8 2xl:px-16">
        <div
          className={cn(
            "flex flex-col lg:flex-row items-center justify-between gap-8",
            { "lg:flex-row-reverse": variant === "imageLeft" },
          )}
        >
          <div className="w-full lg:w-1/2 order-2 lg:order-1 relative h-[32rem] lg:max-w-[42rem]">
            {image && (
              <ImageBox
                fill
                media={image as Media}
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="rounded-[16px]"
              />
            )}
          </div>
          <div className="w-full lg:w-1/2 lg:max-w-xl">
            {subtitle && (
              <div className="mb-8">
                <Badge text={subtitle} />
              </div>
            )}
            <h2 className="mb-6">{title}</h2>
            {content && <RichText data={content} />}
          </div>
        </div>
      </div>
    </section>
  )
}
