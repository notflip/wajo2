import { bgColorMap } from "@/blocks/Blocks"
import Badge from "@/components/badge"
import { ImageBox } from "@/components/ImageBox"
import { cn } from "@/lib/utils"
import { Media, Testimonials } from "@payload-types"

export const TestimonialsComponent: React.FC<Testimonials> = (props) => {
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
        <Badge text={badge} />
        <div className="mt-8 flex items-center justify-between">
          <h2 className="max-w-3xl">{title}</h2>
        </div>
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {(items || []).map((item, index) => {
            const isFirstInPair = index % 2 === 0
            const isEvenRow = Math.floor(index / 2) % 2 === 0
            const shouldSpan2 =
              (isFirstInPair && isEvenRow) || (!isFirstInPair && !isEvenRow)
            return (
              <div
                key={index}
                className={cn(
                  "bg-white flex flex-col justify-between p-12 rounded-[16px]",
                  shouldSpan2 ? "lg:col-span-2" : "lg:col-span-1",
                )}
              >
                <h5>{item.text}</h5>
                <div className="mt-16 flex items-center gap-3">
                  {item.image && (
                    <ImageBox
                      className="w-12 h-12 rounded-full"
                      media={item.image as Media}
                      sizes="96px"
                    />
                  )}
                  {item.name}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
