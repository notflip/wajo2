import Badge from "@/components/badge"
import Breadcrumbs from "@/components/breadcrumbs"
import { DynamicIcon } from "@/components/dynamic-icon"
import { ImageBox } from "@/components/ImageBox"
import { getCase } from "@/lib/payload"
import { cn } from "@/lib/utils"
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

      {/* Probleemstelling */}
      <section className="relative py-sm mb-sm lg:mb-lg">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-12 2xl:px-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-3">
              <Badge text="probleemstelling" />
            </div>
            <div className="md:col-span-8 md:col-start-5">
              <h3 className="mb-8 max-w-lg">{singleCase.problems?.title}</h3>

              {/* Probleemstelling items */}
              <div className="space-y-2">
                {singleCase.problems?.problem_sentences?.map((item, index) => (
                  <div
                    className="bg-slate-50 p-8 flex items-center gap-8 rounded-[16px]"
                    key={index}
                  >
                    <div className="inline-flex w-10 h-10 items-center p-4 bg-slate-100 rounded-full">
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-foreground">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Images */}
      <section className="bg-foreground py-sm lg:py-lg">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-12 2xl:px-16">
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {(singleCase.images_group?.images || []).map((item, index) => {
              const isFirstInPair = index % 2 === 0
              const isEvenRow = Math.floor(index / 2) % 2 === 0
              const shouldSpan2 =
                (isFirstInPair && isEvenRow) || (!isFirstInPair && !isEvenRow)
              return (
                <div
                  key={index}
                  className={cn(
                    "flex flex-col justify-between relative  h-[500px] rounded-[16px] overflow-hidden",
                    shouldSpan2 ? "lg:col-span-2" : "lg:col-span-1",
                  )}
                >
                  {item.image && (
                    <ImageBox
                      fill
                      media={item.image}
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Resultaten */}
      <section className="bg-foreground relative py-sm lg:py-lg">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-12 2xl:px-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-3 text-white">
              <Badge bgColor="black" text="probleemstelling" />
            </div>
            <div className="md:col-span-8 md:col-start-5">
              <h3 className="mb-8 max-w-lg text-white">{singleCase.results?.title}</h3>
              {singleCase.results?.content && (
                <p className="mb-8 text-white">{singleCase.results.content}</p>
              )}

              {/* Probleemstelling items */}
              <div className="space-y-2">
                {singleCase.results?.result_sentences?.map((item, index) => (
                  <div
                    className="bg-slate-600 p-8 flex items-center gap-8 rounded-[16px]"
                    key={index}
                  >
                    <div className="inline-flex w-10 h-10 items-center p-4 bg-slate-100 rounded-full">
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-white">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Image */}
      <section className="bg-foreground relative py-sm lg:py-lg">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-12 2xl:px-16">
          <div className="relative">
            <div className="relative h-[350px] md:h-[500px]">
              {singleCase.testimonial_group?.image && (
                <ImageBox
                  fill
                  sizes="(max-width: 639px) 375px, (max-width: 767px) 500px, (max-width: 1023px) 768px, 1920px"
                  className="rounded-tl-[12px] rounded-tr-[12px] rounded-bl-none rounded-br-none lg:rounded-bl-[12px] lg:rounded-br-[12px]"
                  media={singleCase.testimonial_group.image}
                />
              )}
            </div>
            {singleCase.testimonial_group?.text && (
              <div className="lg:absolute lg:max-w-[50%] lg:right-8 lg:bottom-8 bg-white p-8 rounded-bl-[12px] rounded-br-[12px] rounded-tl-none rounded-tr-none lg:rounded-tl-[12px] lg:rounded-tr-[12px]">
                <div className="">
                  <h5>{singleCase.testimonial_group?.text}</h5>
                  <div className="mt-16">
                    <div>{singleCase.testimonial_group?.author_name}</div>
                    <div>{singleCase.testimonial_group?.author_company}</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
