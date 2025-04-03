import Badge from "@/components/badge"
import { CmsLink } from "@/components/CmsLink"
import AnimatedButton from "@/components/interface/AnimatedButton"
import { FeatureList } from "@payload-types"
import Link from "next/link"
import { HiOutlineArrowUpRight } from "react-icons/hi2"

export const FeatureListComponent: React.FC<FeatureList> = async (props) => {
  const { badge, title, link, items } = props

  return (
    <section className="relative pt-[3rem] pb-[3rem]">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8 2xl:px-16">
        <Badge text={badge} />
        <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <h2 className="max-w-4xl">{title}</h2>
          <AnimatedButton variant="light" asChild>
            <CmsLink {...link} />
          </AnimatedButton>
        </div>
        <div className="mt-24">
          {(items || []).map((item, index) => (
            <CmsLink
              {...item.link}
              key={index}
              className="group flex flex-col md:grid md:grid-cols-[minmax(0,1fr)_1fr_auto] gap-4 md:items-center mb-4 bg-blue-50 transition hover:bg-primary p-8 rounded-[16px]"
            >
              <h4 className="text-foreground group-hover:text-white md:mb-0 mb-2">
                {item.title}
              </h4>
              <p className="max-w-md text-foreground group-hover:text-white md:mb-0 mb-4">
                {item.text}
              </p>
              <div className="text-foreground group-hover:text-white md:ml-auto ml-0">
                <HiOutlineArrowUpRight
                  size="24"
                  className="group-hover:rotate-45 transition"
                />
              </div>
            </CmsLink>
          ))}
        </div>
      </div>
    </section>
  )
}
