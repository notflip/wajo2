import Badge from "@/components/badge"
import Breadcrumbs from "@/components/breadcrumbs"
import { DynamicIcon } from "@/components/dynamic-icon"
import { ImageBox } from "@/components/ImageBox"
import { getCase } from "@/lib/payload"
import { notFound } from "next/navigation"

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params
  const singleCase = await getCase(slug)

  if (!singleCase) {
    notFound()
  }

  return (
    <>
      <section className="relative py-sm lg:py-lg">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-12 2xl:px-16">
          <div className="flex items-center pt-16 lg:pt-24">
            <div className="max-w-5xl">
              <div className="mb-8">
                <Breadcrumbs />
              </div>
              <h1 className="mb-12 text-foreground">{singleCase.title}</h1>
            </div>
          </div>
          <div className="max-w-4xl">
            <p className="mb-8">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus sunt
              adipisci eligendi quidem fugit qui quos ducimus earum animi. Repellendus
              neque vel ex eius eum ducimus autem aperiam deleniti est.
            </p>
          </div>
          <div className="flex items-center gap-2">
            {(singleCase.tags || []).map((item, index) => (
              <Badge text={item} key={index} showIcon={false} />
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-sm">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-12 2xl:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="relative h-[400px] lg:h-auto group p-4 lg:p-8 rounded-[16px] hover:-translate-y-1 transition overflow-hidden">
              <ImageBox
                fill
                media={singleCase.image}
                sizes="(max-width: 768px) 100vw, 30vw"
              />
            </div>
            {(singleCase.stats?.statistics || []).map((item, index) => (
              <div
                key={index}
                className="bg-slate-50 group p-4 lg:p-8 rounded-[16px] hover:-translate-y-1 transition"
              >
                <div className="flex items-center justify-between">
                  <h4 className="mb-8">{item.amount}</h4>
                  {item.icon && (
                    <div className="inline-flex rounded-full mb-8 p-4 bg-slate-100">
                      <DynamicIcon
                        iconName={item.icon}
                        size={32}
                        className="transition group-hover:rotate-12"
                      />
                    </div>
                  )}
                </div>
                <p className="mt-8">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-sm">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-12 2xl:px-16">
          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="col-span-3">
              <Badge text="probleemstelling" />
            </div>
            <div className="md:col-span-7 md:col-start-5">
              <p className="mb-8">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus sunt
                adipisci eligendi quidem fugit qui quos ducimus earum animi. Repellendus
                neque vel ex eius eum ducimus autem aperiam deleniti est.
              </p>
              <div className="flex items-center gap-1">
                {(singleCase.tags || []).map((item, index) => (
                  <Badge text={item} key={index} showIcon={false} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
