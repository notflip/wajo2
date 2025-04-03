import { bgColorMap } from "@/blocks/Blocks"
import Badge from "@/components/badge"
import { DynamicIcon } from "@/components/dynamic-icon"
import { cn } from "@/lib/utils"
import { FeatureRows } from "@payload-types"

export const FeatureRowsComponent: React.FC<FeatureRows> = (props) => {
  const { badge, title, items, bgColor } = props

  return (
    <section
      className={cn(
        "relative pt-[3rem] pb-[3rem]",
        bgColor
          ? `${bgColorMap[bgColor]} mt-[3rem] pt-[6rem] pb-[6rem] mb-[3rem]`
          : "",
      )}
    >
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8 2xl:px-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-5 sticky top-8 self-start">
            <Badge text={badge} />
            <h3 className="mt-8">{title}</h3>
          </div>
          <div className="md:col-start-7 md:col-span-full">
            <div className="flex flex-col gap-8">
              {(items || []).map((item, index) => (
                <div key={index} className="bg-white p-12 rounded-[16px]">
                  {item.icon && (
                    <div className="inline-flex rounded-full mb-8 p-4 bg-primary">
                      <DynamicIcon
                        iconName={item.icon}
                        size={32}
                        className="text-white"
                      />
                    </div>
                  )}
                  <h4 className="mb-8">{item.title}</h4>
                  <p>{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
