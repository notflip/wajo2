"use client"

import { useEffect, useState } from "react"
import { loadIcon } from "@/lib/load-icon"

export function DynamicIcon({
  iconName,
  ...props
}: {
  iconName: string
  [key: string]: any
}) {
  const [IconComponent, setIconComponent] =
    useState<React.ComponentType | null>(null)

  useEffect(() => {
    let isMounted = true
    loadIcon(iconName).then((icon) => {
      if (isMounted) setIconComponent(() => icon)
    })
    return () => {
      isMounted = false
    }
  }, [iconName])

  if (!IconComponent) return null
  return <IconComponent {...props} />
}
