import { Slider } from "@payload-types"
import { Slider as SliderEl } from "@/components/slider"
import Badge from "@/components/badge"
import AnimatedButton from "@/components/interface/AnimatedButton"
import { CmsLink } from "@/components/CmsLink"

export const SliderComponent: React.FC<Slider> = (props) => {
  const { title, subtitle, items, links } = props

  return (
    <section className="bg-secondary overflow-x-hidden mt-[3rem]">
      <div className="py-[3rem] lg:py-[6rem] mx-auto max-w-screen-2xl px-4 md:px-8 2xl:px-16">
        <div className="lg:flex lg:justify-between lg:items-center">
          <div className="max-w-4xl">
            {subtitle && (
              <div className="mb-8">
                <Badge text={subtitle} />
              </div>
            )}
            <h2 className="mb-6">{title}</h2>
          </div>
          <div>
            {links?.length ? (
              <div className="mt-8 inline-flex flex-wrap gap-2">
                {(links || []).map(({ link }, i) => (
                  <AnimatedButton  variant="light" key={i} asChild>
                    <CmsLink {...link} />
                  </AnimatedButton>
                ))}
              </div>
            ) : null}
          </div>
        </div>
        <div className="mt-[5rem]">
          <SliderEl items={items ?? []} />
        </div>
      </div>
    </section>
  )
}
