import { CardsComponent } from "@/blocks/Cards/CardsComponent"
import { CasesComponent } from "@/blocks/Cases/CasesComponent"
import { ContactFormComponent } from "@/blocks/ContactForm/ContactFormComponent"
import { CtaBlockComponent } from "@/blocks/CtaBlock/CtaBlockComponent"
import { EmbedBlockComponent } from "@/blocks/EmbedBlock/EmbedBlockComponent"
import { FeatureComponent } from "@/blocks/Feature/FeatureComponent"
import { FeatureGridComponent } from "@/blocks/FeatureGrid/FeatureGridComponent"
import { FeatureListComponent } from "@/blocks/FeatureList/FeatureListComponent"
import { FeatureRowsComponent } from "@/blocks/FeatureRows/FeatureRowsComponent"
import { FeatureTestimonialsComponent } from "@/blocks/FeatureTestimonials/FeatureTestimonialsComponent"
import { HeroComponent } from "@/blocks/HeroBlock/HeroComponent"
import { HeroFormComponent } from "@/blocks/HeroFormComponent/HeroFormComponent"
import { ImageComponent } from "@/blocks/Image/ImageComponent"
import { LogosComponent } from "@/blocks/Logos/LogosComponent"
import { ParagraphComponent } from "@/blocks/Paragraph/ParagraphComponent"
import { ProcessSliderComponent } from "@/blocks/ProcessSlider/ProcessSliderComponent"
import { SharedBlockComponent } from "@/blocks/SharedBlock/SharedBlockComponent"
import { SliderComponent } from "@/blocks/Slider/SliderComponent"
import { TeamComponent } from "@/blocks/Team/TeamComponent"
import { TestimonialsComponent } from "@/blocks/Testimonials/TestimonialsComponent"

export const blockComponents = {
  hero: HeroComponent,
  heroForm: HeroFormComponent,
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
  ctaBlock: CtaBlockComponent,
  shared: SharedBlockComponent,
  contactForm: ContactFormComponent,
  embedBlock: EmbedBlockComponent,
} as const

export type BlockType = keyof typeof blockComponents

export interface SharedBlockProps {
  index?: number
  prevBlock?: any
  nextBlock?: any
}

export type BlockComponentType = React.ComponentType<
  SharedBlockProps & { [key: string]: any }
>

export interface BlockItem {
  blockType: BlockType
  [key: string]: any
}

export interface BlocksProps {
  blocks?: BlockItem[] | null
}

export const bgGradientMap: Record<string, string> = {
  beige: "bg-fade-to-secondary",
  gray: "bg-fade-to-gray",
}

export const bgGradientMapAfter: Record<string, string> = {
  gray: "bg-fade-to-gray-reverse",
  black: "bg-fade-to-black-reverse",
}
