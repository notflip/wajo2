import Link from "next/link"
import { getCachedGlobal } from "@/utils/getGlobals"
import DesktopNav from "@/components/DesktopNav"
import MobileNavWithClipPath from "@/components/MobileNavWithClipPath"
import AnimatedButton from "@/components/interface/AnimatedButton"
import { Media, Setting } from "@payload-types"
import { ImageBox } from "@/components/ImageBox"
import { HiArchive, HiArrowRight, HiOutlineChat } from "react-icons/hi"
import StickyNavbar from "@/components/nav/sticky-nav"

type Props = {
  settings: Setting
}
export const Nav = async ({ settings }: Props) => {
  const navigationMain = await getCachedGlobal("navigation_main", 1)()

  return (
    <section>
      <div className="flex items-center justify-between">
        <StickyNavbar items={navigationMain.items} settings={settings} />
      </div>
    </section>
  )
}
