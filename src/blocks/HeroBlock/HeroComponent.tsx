import { Hero } from "@payload-types"
import { CmsLink } from "@/components/CmsLink"
import AnimatedButton from "@/components/interface/AnimatedButton"
import { cn } from "@/lib/utils"
import { HiOutlineChat } from "react-icons/hi"
import Avatars from "@/components/avatars"
import Breadcrumbs from "@/components/breadcrumbs"
import { BlockContainer } from "@/blocks/BlockContainer"
import { SharedBlockProps } from "@/blocks/types"

export const HeroComponent: React.FC<Hero & SharedBlockProps> = (props) => {
  const { title, content, links, textAlign, bgColor } = props

  return (
    <BlockContainer bgColor={bgColor} {...props}>
      <div className={cn("flex items-center pt-16 lg:pt-24")}>
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
              bgColor && bgColor === "black" ? `text-white` : "text-foreground",
            )}
          >
            {title}
          </h1>
          <p
            className={cn(
              "max-w-prose text-base",
              bgColor && bgColor === "black" ? `text-white` : "text-muted-foreground",
            )}
          >
            {content}
          </p>
          {links?.length ? (
            <div className="mt-8 lg:inline-flex lg:flex-wrap lg:gap-2 space-y-2 lg:space-y-0">
              {(links || []).map(({ link }, i) => {
                if (i === 0) {
                  return (
                    <AnimatedButton key={i} icon={<HiOutlineChat size={20} />} asChild>
                      <CmsLink {...link} />
                    </AnimatedButton>
                  )
                } else {
                  return (
                    <AnimatedButton key={i} variant="avatars" avatars={<Avatars />} asChild>
                      <CmsLink {...link} />
                    </AnimatedButton>
                  )
                }
              })}
            </div>
          ) : null}
        </div>
      </div>
    </BlockContainer>
  )
}
