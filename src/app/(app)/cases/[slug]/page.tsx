import Badge from "@/components/badge"
import Breadcrumbs from "@/components/breadcrumbs"
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
        <div className="mx-auto max-w-screen-2xl px-4 md:px-8 2xl:px-16">
          <div className="flex items-center pt-16 lg:pt-20">
            <div className="max-w-5xl">
              <div className="mb-8">
                <Breadcrumbs />
              </div>
              <h1 className="mb-12 text-foreground">{singleCase.title}</h1>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-sm lg:py-lg">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-8 2xl:px-16">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
            <div className="col-span-3">
              <Badge text="introductie" />
            </div>
            <p className="md:col-span-7 md:col-start-5">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus sunt adipisci
              eligendi quidem fugit qui quos ducimus earum animi. Repellendus neque vel ex eius eum
              ducimus autem aperiam deleniti est.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
