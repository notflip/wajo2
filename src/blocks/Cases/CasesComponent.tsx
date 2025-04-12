import { BlockContainer } from "@/blocks/BlockContainer"
import { Callout } from "@/blocks/Image/ImageComponent"
import Badge from "@/components/badge"
import { CmsLink } from "@/components/CmsLink"
import { DynamicIcon } from "@/components/dynamic-icon"
import { ImageBox } from "@/components/ImageBox"
import AnimatedButton from "@/components/interface/AnimatedButton"
import { getLatestCases } from "@/lib/payload"
import { Cases, Media } from "@payload-types"
import Link from "next/link"

export const CasesComponent: React.FC<Cases> = async (props) => {
  const { badge, title, link } = props

  const latestCases = await getLatestCases()

  return (
    <BlockContainer {...props}>
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8 2xl:px-16">
        <Badge text={badge} />
        <div className="mt-8 md:flex md:items-center md:justify-between space-y-8 md:space-y-0">
          <h2 className="max-w-3xl">{title}</h2>
          <AnimatedButton variant="light" asChild>
            <CmsLink {...link} />
          </AnimatedButton>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 mt-20 gap-8">
          {(latestCases || []).map((item, index) => (
            <Link href="#" key={index} className="relative group">
              <div className="relative h-[400px] rounded-[16px] overflow-hidden">
                {item.image && (
                  <ImageBox
                    className="group-hover:scale-105 transition"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    media={item.image as Media}
                  />
                )}
                {item.callout?.content && (
                  <div className="absolute max-w-[300px] right-2 bottom-2 lg:right-8 lg:bottom-8 bg-white p-4 rounded-[12px]">
                    <Callout callout={item.callout} />
                  </div>
                )}
              </div>
              <div className="mt-5 md:flex md:justify-between md:items-center">
                <div className="font-medium">{item.title}</div>
                <div className="font-medium text-slate-950 capitalize">
                  {item.tags?.slice(0, 3).join(", ")}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </BlockContainer>
  )
}
