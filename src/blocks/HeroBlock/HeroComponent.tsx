import { Hero } from "@payload-types"
import { CmsLink } from "@/components/CmsLink"
import AnimatedButton from "@/components/interface/AnimatedButton"
import { cn } from "@/lib/utils"
import { HiOutlineChat } from "react-icons/hi"
import Avatars from "@/components/avatars"

export const HeroComponent: React.FC<Hero> = (props) => {
  const { title, content, links, textAlign } = props

  return (
    <section className="relative">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8 2xl:px-16">
        <div className="flex items-center py-12 md:py-16 lg:py-25">
          <div
            className={cn("max-w-3xl", {
              "mx-auto text-center": textAlign === "center",
            })}
          >
            <h1 className="mb-8">{title}</h1>
            <p className="max-w-prose text-base text-muted-foreground mb-8">{content}</p>
            <div className="inline-flex flex-wrap gap-2">
              {(links || []).map(({ link }, i) => {
                if (i === 0) {
                  return (
                    <AnimatedButton key={i} icon={<HiOutlineChat size="20" />} asChild>
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
          </div>
        </div>
      </div>
    </section>
  )
}
