import { bgColorMap } from "@/blocks/Blocks"
import { CmsLink } from "@/components/CmsLink"
import { DynamicIcon } from "@/components/dynamic-icon"
import AnimatedButton from "@/components/interface/AnimatedButton"
import { cn } from "@/lib/utils"
import { Cards } from "@payload-types"

export const CardsComponent: React.FC<Cards> = (props) => {
  const { items, bgColor } = props

  return (
    <section
      className={cn(
        "relative py-sm lg:py-lg",
        bgColor ? `${bgColorMap[bgColor]}` : "",
      )}
    >
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8 2xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {(items || []).map((item, index) => (
            <CmsLink
              type="reference"
              reference={item.reference}
              key={index}
              className="bg-white group p-8 rounded-[16px] hover:-translate-y-1 transition"
            >
              <div>
                {item.icon && (
                  <div className="inline-flex rounded-full mb-8 p-4 bg-secondary">
                    <DynamicIcon
                      iconName={item.icon}
                      size={32}
                      className="transition group-hover:rotate-12"
                    />
                  </div>
                )}
                <h4 className="mb-8">{item.title}</h4>
                <p>{item.text}</p>
              </div>
            </CmsLink>
          ))}
        </div>
      </div>
    </section>
  )
}
