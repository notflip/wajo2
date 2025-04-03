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
        <div className="mt-8 flex items-center justify-between">
          <h2 className="max-w-3xl">{title}</h2>
          <AnimatedButton variant="light" asChild>
            <CmsLink {...link} />
          </AnimatedButton>
        </div>
        <div className="mt-24">
          {(items || []).map((item, index) => (
            <Link
              href="#"
              key={index}
              className="group flex items-center mb-4 justify-between bg-slate-50 transition hover:bg-primary p-8 rounded-[16px]"
            >
              {JSON.stringify(link)}
              <h4 className="text-foreground group-hover:text-white">
                {item.title}
              </h4>
              <p className="text-foreground group-hover:text-white">
                {item.text}
              </p>
              <div className="text-foreground group-hover:text-white">
                <HiOutlineArrowUpRight size="24" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
