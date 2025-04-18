import { BlockProps, BlockType } from "@/blocks/types"
import React from "react"
import { BlockComponentType } from "@/blocks/types"

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
import { LogosComponent } from "@/blocks/Logos/LogosComponent"
import { FeatureTestimonialsComponent } from "@/blocks/FeatureTestimonials/FeatureTestimonialsComponent"
import { ProcessSliderComponent } from "@/blocks/ProcessSlider/ProcessSliderComponent"
import { CtaBlockComponent } from "@/blocks/CtaBlock/CtaBlockComponent"
import { SharedBlockComponent } from "@/blocks/SharedBlock/SharedBlockComponent"
import { ContactFormComponent } from "@/blocks/ContactForm/ContactFormComponent"
import { EmbedBlockComponent } from "@/blocks/EmbedBlock/EmbedBlockComponent"
import { FeatureGridComponent } from "@/blocks/FeatureGrid/FeatureGridComponent"

export const blockComponents: Record<string, BlockComponentType> = {
  hero: HeroComponent,
  image: ImageComponent,
  paragraph: ParagraphComponent,
  cards: CardsComponent,
  cases: CasesComponent,
  featureGrid: FeatureGridComponent,
  featureRows: FeatureRowsComponent,
  featureList: FeatureListComponent,
  featureTestimonials: FeatureTestimonialsComponent,
  testimonials: TestimonialsComponent,
  team: TeamComponent,
  feature: FeatureComponent,
  slider: SliderComponent,
  logos: LogosComponent,
  processSlider: ProcessSliderComponent,
  contactForm: ContactFormComponent,
  embedBlock: EmbedBlockComponent,
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
