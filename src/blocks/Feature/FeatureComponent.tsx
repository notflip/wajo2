import { Feature, Media } from "@payload-types"
import { ImageBox } from "@/components/ImageBox"
import { cn } from "@/lib/utils"
import RichText from "@/components/RichText"
import Badge from "@/components/badge"
import { BlockContainer } from "@/blocks/BlockContainer"

export const FeatureComponent: React.FC<Feature> = (props) => {
  const { subtitle, title, content, image, imageNoFill, variant } = props

  console.log(imageNoFill)

  return (
    <BlockContainer>
      <div
        className={cn("flex flex-col lg:flex-row items-stretch justify-between gap-8", {
          "lg:flex-row-reverse": variant === "imageLeft",
        })}
      >
        <div className="w-full lg:w-1/2 order-2 lg:order-1 relative lg:max-w-[42rem]">
          {image && (
            <ImageBox
              fill={!imageNoFill}
              media={image}
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
          <h2 className="h3 mb-8">{title}</h2>
          {content && <RichText data={content} />}
        </div>
      </div>
    </BlockContainer>
  )
}
