"use client"

import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Slottable, Slot } from "@radix-ui/react-slot"
import { ButtonHTMLAttributes, ReactNode } from "react"

type Props = {
  children: ReactNode
  variant?: "default" | "light" | "link" | "avatars"
  hasArrow?: boolean
  asChild?: boolean
  avatars?: ReactNode
  icon?: ReactNode
} & ButtonHTMLAttributes<HTMLButtonElement>

const animatedButtonVariants = cva(
  "group relative inline-flex items-center px-5 py-2.5 justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary hover:bg-primary/90 text-white",
        light: "bg-blue-50 hover:bg-primary/20 text-blue-950",
        avatars: "px-8 bg-blue-50 hover:bg-beige-50 text-blue-950",
        link: "bg-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

export default function AnimatedButton({
  children,
  avatars,
  variant = "default",
  hasArrow = true,
  asChild = false,
  icon,
  ...props
}: Props) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      {...props}
      className={cn(animatedButtonVariants({ variant }), props.className)}
    >
      {avatars}
      <Slottable>{children}</Slottable>
      {icon && <div>{icon}</div>}
    </Comp>
  )
}
