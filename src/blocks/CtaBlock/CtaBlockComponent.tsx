import { CmsLink } from "@/components/CmsLink"
import { ImageBox } from "@/components/ImageBox"
import AnimatedButton from "@/components/interface/AnimatedButton"
import { Badge } from "@/components/ui/badge"
import { CtaBlock, Media } from "@payload-types"

export const CtaBlockComponent: React.FC<CtaBlock> = (props) => {
  const { subtitle, title, text, image, link } = props

  return (
    <section className="pt-[3rem] lg:pt-[6rem] pb-[3rem] lg:pb-[3rem]">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8 2xl:px-16">
        <div className="flex flex-col lg:flex-row items-stretch">
          <div className="w-full lg:w-1/2 bg-brand-yellow p-8 lg:p-16 rounded-t-[20px] lg:rounded-t-none lg:rounded-tl-[20px] lg:rounded-bl-[20px]">
            <div className="max-w-lg">
              {subtitle && (
                <Badge variant="white" className="mb-8">
                  {subtitle}
                </Badge>
              )}
              <h2 className="mb-6">{title}</h2>
              <p className="md:text-md">{text}</p>
              <div className="mt-6 flex flex-wrap gap-2 md:mt-8">
                {link && (
                  <AnimatedButton asChild>
                    <CmsLink {...link} />
                  </AnimatedButton>
                )}
              </div>
            </div>
          </div>
          <div className="w-full h-[400px] lg:h-auto lg:w-1/2 relative rounded-b-[20px] lg:rounded-b-none lg:rounded-tr-[20px] lg:rounded-br-[20px] overflow-hidden">
            {image && (
              <ImageBox
                fill
                media={image as Media}
                sizes="(max-width: 1024px) 1024px, 1920px"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
