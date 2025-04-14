import { BlockContainer } from "@/blocks/BlockContainer"
import Avatars from "@/components/avatars"
import { CmsLink } from "@/components/CmsLink"
import AnimatedButton from "@/components/interface/AnimatedButton"
import { CtaBlock } from "@payload-types"
import { HiOutlineChat } from "react-icons/hi"

export const CtaBlockComponent: React.FC<CtaBlock> = (props) => {
  const { subtitle, title, text, bgColor, links } = props

  return (
    <BlockContainer bgColor={bgColor} {...props}>
      <div className="py-16 lg:py-20 text-center text-white">
        <div className="max-w-2xl mx-auto">
          {subtitle && <p className="mb-4 text-white/40">{subtitle}</p>}
          <h2 className="mb-6">{title}</h2>
          <p className="md:text-md">{text}</p>
        </div>
        <div className="mt-6 lg:inline-flex lg:flex-wrap lg:gap-4 space-y-2 lg:space-y-0">
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
      </div>
    </BlockContainer>
  )
}
