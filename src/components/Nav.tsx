import Link from "next/link"
import Image from "next/image"
import { getCachedGlobal } from "@/utils/getGlobals"
import DesktopNav from "@/components/DesktopNav"
import MobileNavWithClipPath from "@/components/MobileNavWithClipPath"
import AnimatedButton from "@/components/interface/AnimatedButton"
import { Media, Setting } from "@payload-types"
import { ImageBox } from "@/components/ImageBox"
import { HiArchive, HiArrowRight, HiOutlineChat } from "react-icons/hi"

type Props = {
  settings: Setting
}
export const Nav = async ({ settings }: Props) => {
  const navigationMain = await getCachedGlobal("navigation_main", 1)()

  return (
    <section>
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8 2xl:px-16">
        <div className="flex items-center justify-between h-28">
          <div className="flex items-center justify-between w-full gap-4 xl:gap-8 2xl:gap-16">
            <Link href="/" className="flex-none">
              <ImageBox
                disableBlurhash
                media={settings.logo as Media}
                className="w-[120px]"
                sizes="120px"
              />
            </Link>
            {/*Desktop View*/}
            <div className="hidden lg:block z-[60]">
              <DesktopNav items={navigationMain.items} />
            </div>
            {/*Button*/}
            <div className="hidden lg:block">
              <AnimatedButton icon={<HiOutlineChat size="20" />} asChild>
                <Link href="/afspraak-maken">Afspraak Maken</Link>
              </AnimatedButton>
              <AnimatedButton
                variant="light"
                icon={<HiArrowRight size="16" />}
                asChild
              >
                <Link href="/afspraak-maken">Afspraak Maken</Link>
              </AnimatedButton>
            </div>
          </div>

          {/* Mobile Menu */}
          <div className="lg:hidden">
            <MobileNavWithClipPath items={navigationMain.items} />
          </div>
        </div>
      </div>
    </section>
  )
}
