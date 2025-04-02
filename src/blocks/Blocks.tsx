import { CtaBlockComponent } from "@/blocks/CtaBlock/CtaBlockComponent"
import { SharedBlockComponent } from "@/blocks/SharedBlock/SharedBlockComponent"
import { HeroComponent } from "@/blocks/HeroBlock/HeroComponent"
import { ImageComponent } from "@/blocks/Image/ImageComponent"
import { ParagraphComponent } from "@/blocks/Paragraph/ParagraphComponent"
import { CardsComponent } from "@/blocks/Cards/CardsComponent"

export type BlockType = keyof Partial<typeof blockComponents>

interface BlockItem {
  blockType?: BlockType

  [key: string]: any
}

export interface BlockProps {
  blocks?: BlockItem[] | null
}

export const bgColorMap: Record<string, string> = {
  beige: "secondary",
}

export const bgGradientMap: Record<string, string> = {
  beige: "bg-fade-to-secondary",
}

export const blockComponents = {
  hero: HeroComponent,
  image: ImageComponent,
  paragraph: ParagraphComponent,
  cards: CardsComponent,
  cta: CtaBlockComponent,
  shared: SharedBlockComponent,
}

const Blocks: React.FC<BlockProps> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType as BlockType]
            const nextBlock = blocks[index + 1]

            if (Block) {
              return (
                <div key={index}>
                  {/*@ts-ignore*/}
                  <Block
                    {...block}
                    index={index}
                    nextBgColor={nextBlock?.bgColor}
                  />
                </div>
              )
            }
          }
          return null
        })}
      </>
    )
  }
}

export default Blocks
