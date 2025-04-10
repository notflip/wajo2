"use client"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { HiArrowLeft } from "react-icons/hi"

type BreadcrumbProps = {}

export default function Breadcrumbs(props: BreadcrumbProps) {
  const paths = usePathname()
  const pathNames = paths.split("/").filter((path) => path)

  if (!pathNames.length) {
    return null
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild className="flex gap-2 items-center">
            <Link href="/">
              <HiArrowLeft />
              <span>Home</span>
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {pathNames.length > 0 && <BreadcrumbSeparator>/</BreadcrumbSeparator>}
        {pathNames.map((link, index) => {
          let href = `/${pathNames.slice(0, index + 1).join("/")}`
          return (
            <BreadcrumbItem key={index}>
              <BreadcrumbLink asChild>
                <Link href={href} className="capitalize">
                  {link}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
