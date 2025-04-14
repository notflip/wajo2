import { CtaBlockComponent } from "@/blocks/CtaBlock/CtaBlockComponent"
import { SharedBlockComponent } from "@/blocks/SharedBlock/SharedBlockComponent"
import { HeroComponent } from "@/blocks/HeroBlock/HeroComponent"
import { ImageComponent } from "@/blocks/Image/ImageComponent"
import { ParagraphComponent } from "@/blocks/Paragraph/ParagraphComponent"
import { CardsComponent } from "@/blocks/Cards/CardsComponent"
import { CasesComponent } from "@/blocks/Cases/CasesComponent"
import { FeatureRowsComponent } from "@/blocks/FeatureRows/FeatureRowsComponent"
import { FeatureListComponent } from "@/blocks/FeatureList/FeatureListComponent"
import { TestimonialsComponent } from "@/blocks/Testimonials/TestimonialsComponent"
import { TeamComponent } from "@/blocks/Team/TeamComponent"
import { FeatureComponent } from "@/blocks/Feature/FeatureComponent"
import { SliderComponent } from "@/blocks/Slider/SliderComponent"
import React from "react"
import { LogosComponent } from "@/blocks/Logos/LogosComponent"
import { FeatureTestimonialsComponent } from "@/blocks/FeatureTestimonials/FeatureTestimonialsComponent"

export type BlockType = keyof Partial<typeof blockComponents>

export interface BlockItem {
  blockType?: BlockType

  [key: string]: any
}

export interface BlockProps {
  blocks?: BlockItem[] | null
}

export const bgColorMap: Record<string, string> = {
  beige: "bg-beige-50",
  gray: "bg-slate-50",
  blue: "bg-blue-600",
  black: "bg-blue-950",
}

export const bgGradientMap: Record<string, string> = {
  beige: "bg-fade-to-secondary",
  gray: "bg-fade-to-gray",
}

export const bgGradientMapAfter: Record<string, string> = {
  gray: "bg-fade-to-gray-reverse",
  black: "bg-fade-to-black-reverse",
}

export interface SharedBlockProps {
  index: number
  prevBlock?: any
  nextBlock?: any
}

type BlockComponentType = React.ComponentType<any & SharedBlockProps>

export const blockComponents: Record<string, BlockComponentType> = {
  hero: HeroComponent,
  image: ImageComponent,
  paragraph: ParagraphComponent,
  cards: CardsComponent,
  cases: CasesComponent,
  featureRows: FeatureRowsComponent,
  featureList: FeatureListComponent,
  testimonials: TestimonialsComponent,
  team: TeamComponent,
  feature: FeatureComponent,
  slider: SliderComponent,
  logos: LogosComponent,
  featureTestimonials: FeatureTestimonialsComponent,
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

            if (Block) {
              return (
                <Block
                  key={index}
                  index={index}
                  {...block}
                  prevBlock={blocks[index - 1]}
                  nextBlock={blocks[index + 1]}
                />
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
