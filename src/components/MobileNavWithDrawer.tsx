"use client"

import { useEffect, useState } from "react"
import { LuChevronDown, LuMenu, LuX } from "react-icons/lu"
import Link from "next/link"
import { useScrollLock } from "usehooks-ts"
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

type NavLink = {
  href: string
  title: string
  description: string
  links?: NavLink[]
}

/**
 * This is a mobile nav with the shadcn drawer coming up from below
 * @param navLinks
 * @constructor
 */
export default function MobileNavWithDrawer({
  navLinks,
}: {
  navLinks: NavLink[]
}) {
  const [isOpen, setIsOpen] = useState(false)
  const { lock, unlock } = useScrollLock()

  useEffect(() => {
    return isOpen ? lock() : unlock()
  }, [isOpen])

  const toggleDrawer = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <Drawer open={isOpen} onOpenChange={toggleDrawer}>
        <DrawerTrigger asChild>
          <button className="lg:hidden z-[60] relative text-2xl">
            {isOpen ? <LuX className="text-white" /> : <LuMenu className="" />}
          </button>
        </DrawerTrigger>

        <DrawerContent className="border-none z-[998] fixed inset-0 bg-black overflow-y-auto  text-white p-6 pb-20">
          <ul>
            {navLinks.map(({ title, href, links }) => {
              return (
                <li key={title} className="py-2">
                  {links?.length ? (
                    <Collapsible>
                      <CollapsibleTrigger className="flex justify-between w-full items-center">
                        {title}
                        <LuChevronDown />
                      </CollapsibleTrigger>
                      <CollapsibleContent className="">
                        <ul>
                          {links.map(({ title, href }) => (
                            <li key={title} className="py-2">
                              <Link href={href}>{title}</Link>
                            </li>
                          ))}
                        </ul>
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <Link href={href}>{title}</Link>
                  )}
                </li>
              )
            })}
          </ul>
        </DrawerContent>
      </Drawer>
    </>
  )
}
