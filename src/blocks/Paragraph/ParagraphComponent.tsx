import { bgColorMap } from "@/blocks/Blocks"
import Badge from "@/components/badge"
import { cn } from "@/lib/utils"
import { Paragraph } from "@payload-types"

export const ParagraphComponent: React.FC<Paragraph> = (props) => {
  const { badge, content, bgColor } = props

  return (
    <section
      className={cn(
        "pt-[1rem] pb-[3rem] lg:pb-[3rem]",
        bgColor ? `bg-${bgColorMap[bgColor]}` : "",
      )}
    >
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8 2xl:px-16">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
          <div className="col-span-2">
            <Badge text={badge} />
          </div>
          <h3 className="md:col-span-7 md:col-start-5">{content}</h3>
        </div>
      </div>
    </section>
  )
}
