import { bgColorMap } from "@/blocks/Blocks"
import { DynamicIcon } from "@/components/dynamic-icon"
import { cn } from "@/lib/utils"
import { Cards } from "@payload-types"

export const CardsComponent: React.FC<Cards> = (props) => {
  const { items, bgColor } = props

  return (
    <section
      className={cn(
        "relative pt-[3rem] pb-[3rem]",
        bgColor ? `${bgColorMap[bgColor]} pb-[6rem] mb-[3rem]` : "",
      )}
    >
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8 2xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {(items || []).map((item, index) => (
            <div key={index} className="bg-white p-8 rounded-[16px]">
              {item.icon && (
                <div className="inline-flex rounded-full mb-8 p-4 bg-secondary">
                  <DynamicIcon iconName={item.icon} size={32} className="" />
                </div>
              )}
              <h4 className="mb-8">{item.title}</h4>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
