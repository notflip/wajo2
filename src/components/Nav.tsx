import Link from "next/link"
import Image from "next/image"
import { getCachedGlobal } from "@/utils/getGlobals"
import DesktopNav from "@/components/DesktopNav"
import MobileNavWithClipPath from "@/components/MobileNavWithClipPath"
import AnimatedButton from "@/components/interface/AnimatedButton"
import TopNav from "@/components/top-nav"

export const Nav = async () => {
  const navigationMain = await getCachedGlobal("navigation_main", 1)()
  const websiteSettings = await getCachedGlobal("settings")()

  return (
    <section className="relative">
      <TopNav settings={websiteSettings} />
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8 2xl:px-16">
        <div className="flex items-center justify-between h-28">
          <div className="flex items-center justify-between w-full gap-4 xl:gap-8 2xl:gap-16">
            <Link href="/" className="flex-none">
              <Image
                alt="Logo"
                src="/logo.png"
                width={404}
                height={121}
                className="w-[140px] md:w-[180px]"
                priority
              />
            </Link>
            {/*Desktop View*/}
            <div className="hidden lg:block z-[60]">
              <DesktopNav items={navigationMain.items} />
            </div>
            {/*Button*/}
            <div className="hidden lg:block">
              <AnimatedButton asChild>
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
