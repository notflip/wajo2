export interface SharedBlockProps {
  index?: number
  prevBlock?: any
  nextBlock?: any
}

export type BlockComponentType = React.ComponentType<any & SharedBlockProps>

export type BlockType =
  | "hero"
  | "image"
  | "paragraph"
  | "cards"
  | "cases"
  | "featureRows"
  | "featureList"
  | "testimonials"
  | "team"
  | "feature"
  | "slider"
  | "logos"
  | "featureTestimonials"
  | "processSlider"
  | "ctaBlock"
  | "shared"

export interface BlockItem {
  blockType?: BlockType
  [key: string]: any
}

export interface BlockProps {
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
