import { Hero } from "@payload-types"
import { CmsLink } from "@/components/CmsLink"
import AnimatedButton from "@/components/interface/AnimatedButton"
import { cn } from "@/lib/utils"
import { HiOutlineChat } from "react-icons/hi"
import Avatars from "@/components/avatars"
import { bgColorMap, SharedBlockProps } from "@/blocks/Blocks"
import Breadcrumbs from "@/components/breadcrumbs"

export const HeroComponent: React.FC<Hero & SharedBlockProps> = (props) => {
  const { title, content, links, textAlign, bgColor, classOverride } = props

  return (
    <section
      className={cn(
        bgColor ? `${bgColorMap[bgColor]}` : "",
        bgColor && bgColor === "black" ? `text-white` : "",
      )}
    >
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8 2xl:px-16">
        <div className="pt-16">
          <div
            className={cn(
              "flex items-center py-12 md:py-16 lg:py-24",
              classOverride,
            )}
          >
            <div
              className={cn("max-w-4xl", {
                "mx-auto text-center": textAlign === "center",
              })}
            >
              <div className="mb-8">
                <Breadcrumbs />
              </div>
              <h1
                className={cn(
                  "mb-12",
                  bgColor && bgColor === "black"
                    ? `text-white`
                    : "text-foreground",
                )}
              >
                {title}
              </h1>
              <p
                className={cn(
                  "max-w-prose text-base",
                  bgColor && bgColor === "black"
                    ? `text-white`
                    : "text-muted-foreground",
                  links?.length === 0 ? "mb-6 lg:mb-12" : "",
                )}
              >
                {content}
              </p>
              {links?.length ? (
                <div className="mt-8 lg:inline-flex lg:flex-wrap lg:gap-2 space-y-2 lg:space-y-0">
                  {(links || []).map(({ link }, i) => {
                    if (i === 0) {
                      return (
                        <AnimatedButton
                          key={i}
                          icon={<HiOutlineChat size={20} />}
                          asChild
                        >
                          <CmsLink {...link} />
                        </AnimatedButton>
                      )
                    } else {
                      return (
                        <AnimatedButton
                          key={i}
                          variant="avatars"
                          avatars={<Avatars />}
                          asChild
                        >
                          <CmsLink {...link} />
                        </AnimatedButton>
                      )
                    }
                  })}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
