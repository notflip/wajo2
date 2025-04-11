import { ImageBox } from "@/components/ImageBox"
import { Marquee } from "@/components/marquee"
import { cn } from "@/lib/utils"
import { Logos, Media } from "@payload-types"

export const LogosComponent: React.FC<Logos> = (props) => {
  const { items } = props

  return (
    <section className={cn("py-[3rem]")}>
      <div className="flex gap-[var(--marquee-gap)] overflow-hidden">
        <div className="flex shrink-0 items-center justify-around gap-[var(--marquee-gap)] min-w-full animate-scroll-x">
          {(items || []).map(({ image }, index) => (
            <div className="p-[calc(var(--marquee-size)_/_10)]" key={index}>
              <ImageBox
                className="w-[var(--marquee-size)]"
                media={image as Media}
                sizes="200px"
                disableBlurhash
              />
            </div>
          ))}
        </div>
        <div className="flex shrink-0 items-center justify-around gap-[var(--marquee-gap)] min-w-full animate-scroll-x">
          {(items || []).map(({ image }, index) => (
            <div className="p-[calc(var(--marquee-size)_/_10)]" key={index}>
              <ImageBox
                className="w-[var(--marquee-size)]"
                media={image as Media}
                sizes="200px"
                disableBlurhash
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
