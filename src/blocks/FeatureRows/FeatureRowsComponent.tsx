import { bgColorMap } from "@/blocks/Blocks"
import { DynamicIcon } from "@/components/dynamic-icon"
import { cn } from "@/lib/utils"
import { Cards } from "@payload-types"

export const FeatureRowsComponent: React.FC<Cards> = (props) => {
  const { items, bgColor } = props

  return (
    <section
      className={cn(
        "relative pt-[3rem] pb-[3rem]",
        bgColor ? `${bgColorMap[bgColor]} pb-[6rem] mb-[3rem]` : "",
      )}
    >
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8 2xl:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        Hello World
        </div>
      </div>
    </section>
  )
}
