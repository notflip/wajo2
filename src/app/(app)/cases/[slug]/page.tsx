import { HeroComponent } from "@/blocks/HeroBlock/HeroComponent"

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function Page({ params }: PageProps) {
  return (
    <>
      <HeroComponent title="Test" content="" blockType="hero" />
    </>
  )
}
