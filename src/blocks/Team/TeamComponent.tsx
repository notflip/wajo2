import { bgColorMap } from "@/blocks/Blocks"
import Badge from "@/components/badge"
import { CmsLink } from "@/components/CmsLink"
import { ImageBox } from "@/components/ImageBox"
import AnimatedButton from "@/components/interface/AnimatedButton"
import { cn } from "@/lib/utils"
import { Media, Team } from "@payload-types"

export const TeamComponent: React.FC<Team> = (props) => {
  const { badge, title, content, links, members, showLine, bgColor } = props

  return (
    <section
      className={cn(
        "py-sm lg:py-lg",
        bgColor ? `${bgColorMap[bgColor]} my-sm lg:my-lg` : "",
        showLine ? `pt-0 mt-0 lg:pt-0 lg:mt-0` : "",
      )}
    >
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8 2xl:px-16">
        {showLine && (
          <div className="pb-sm lg:pb-lg">
            <hr className="h-px bg-foreground/10 border-0" />
          </div>
        )}
        <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:gap-y-16 md:grid-cols-12">
          <div className="md:col-span-2">
            <Badge text={badge} />
          </div>
          <div className="md:col-span-6 md:col-start-4">
            <h4 className="mb-6">{title}</h4>
            <p>{content}</p>
          </div>
          {(links || []).length > 0 && (
            <div className="md:col-span-3 md:text-right">
              {(links || []).map(({ link }, i) => (
                <AnimatedButton key={i} variant="light" asChild>
                  <CmsLink {...link} />
                </AnimatedButton>
              ))}
            </div>
          )}
          <div className="md:col-start-4 md:col-span-full grid grid-cols-2 lg:grid-cols-4 gap-4">
            {(members || []).map(({ image }, i) => (
              <div key={i} className="relative h-[250px]">
                <ImageBox
                  fill
                  className="rounded-[8px]"
                  media={image as Media}
                  sizes="(max-width: 1024px) 100vw, 30vw"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
