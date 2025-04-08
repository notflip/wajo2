import { ImageBox } from "@/components/ImageBox"
import { getCachedGlobal } from "@/utils/getGlobals"
import { Media } from "@payload-types"

export default async function Avatars() {
  const siteSettings = await getCachedGlobal("settings")()

  return (
    <div className="flex">
      {siteSettings.avatars.map(({ image }, index) => (
        <div key={index} className="-ml-4">
          <ImageBox disableBlurhash media={image as Media} sizes="60px" className="w-[32px] h-[32px] rounded-full" />
        </div>
      ))}
    </div>
  )
}
