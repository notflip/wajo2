import Avatars from "@/components/avatars"
import { CmsLink } from "@/components/CmsLink"
import AnimatedButton from "@/components/interface/AnimatedButton"
import { CtaBlock, Media } from "@payload-types"
import { HiOutlineChat } from "react-icons/hi"

export const CtaBlockComponent: React.FC<CtaBlock> = (props) => {
  const { subtitle, title, text, links } = props

  return (
    <section className="mt-[3rem] pt-[3rem] pb-[3rem] bg-blue-600">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8 2xl:px-16">
        <div className="py-32 text-center text-white">
          <div className="max-w-2xl mx-auto">
            {subtitle && <p className="mb-4 text-white/40">{subtitle}</p>}
            <h2 className="mb-6">{title}</h2>
            <p className="md:text-md">{text}</p>
          </div>
          <div className="mt-6 inline-flex flex-wrap gap-4">
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
      </div>
    </section>
  )
}
