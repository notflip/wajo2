import { BlockContainer } from "@/blocks/BlockContainer"
import { bgColorMap, SharedBlockProps } from "@/blocks/Blocks"
import Badge from "@/components/badge"
import { cn } from "@/lib/utils"
import { Paragraph } from "@payload-types"

export const ParagraphComponent: React.FC<Paragraph & SharedBlockProps> = (
  props,
) => {
  const { badge, content, bgColor } = props

  return (
    <BlockContainer bgColor={bgColor} {...props}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
        <div className="col-span-3">
          <Badge text={badge} />
        </div>
        <h2 className="h3 md:col-span-9 md:col-start-4">{content}</h2>
      </div>
    </BlockContainer>
  )
}
