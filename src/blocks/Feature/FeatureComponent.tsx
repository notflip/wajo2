import { Feature, Media } from "@payload-types"
import { ImageBox } from "@/components/ImageBox"
import { cn } from "@/lib/utils"
import RichText from "@/components/RichText"
import Badge from "@/components/badge"
import { BlockContainer } from "@/blocks/BlockContainer"

export const FeatureComponent: React.FC<Feature> = (props) => {
  const { subtitle, title, content, image, variant } = props

  return (
    <BlockContainer>
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
    </BlockContainer>
  )
}
