import { BlockContainer } from "@/blocks/BlockContainer"
import type { EmbedBlock } from "@payload-types"
import { ImageBox } from "@/components/ImageBox"
import { EmbedSender } from "@/components/embed-sender"

export const EmbedBlockComponent: React.FC<EmbedBlock> = ({
  script,
  html,
  image,
  ...rest
}) => {
  return (
    <BlockContainer {...rest}>
      <div className="pt-16 lg:pt-24 flex flex-col lg:flex-row items-center justify-between gap-8">
        <div className={`w-full ${image ? "lg:w-1/2" : ""}`}>
          <EmbedSender />
        </div>
        {image && (
          <div className="w-full lg:w-1/2 order-2 lg:order-1 relative min-h-[400px] lg:max-w-[42rem]">
            {image && (
              <ImageBox
                fill
                media={image}
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="rounded-[16px]"
              />
            )}
          </div>
        )}
      </div>
    </BlockContainer>
  )
}
