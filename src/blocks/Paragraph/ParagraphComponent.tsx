import { bgColorMap, SharedBlockProps } from "@/blocks/Blocks"
import Badge from "@/components/badge"
import { cn } from "@/lib/utils"
import { Paragraph } from "@payload-types"

export const ParagraphComponent: React.FC<Paragraph & SharedBlockProps> = (
  props,
) => {
  const { badge, content, bgColor, classOverride } = props

  return (
    <section
      className={cn(
        "py-[3rem] lg:py-[6rem]",
        bgColor ? `${bgColorMap[bgColor]}` : "",
        classOverride,
      )}
    >
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8 2xl:px-16">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
          <div className="col-span-3">
            <Badge text={badge} />
          </div>
          <h2 className="h3 md:col-span-9 md:col-start-4">{content}</h2>
        </div>
      </div>
    </section>
  )
}
