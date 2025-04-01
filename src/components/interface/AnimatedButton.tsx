"use client"

import { cva } from "class-variance-authority"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Slottable, Slot } from "@radix-ui/react-slot"
import { ButtonHTMLAttributes, ReactNode } from "react"

type Props = {
  children: ReactNode
  variant?: "default" | "light" | "link"
  hasArrow?: boolean
  asChild?: boolean
  icon?: ReactNode
  iconSize?: number
} & ButtonHTMLAttributes<HTMLButtonElement>

const animatedButtonVariants = cva(
  "group relative inline-flex items-center px-5 py-3 justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary hover:bg-primary/90 text-white",
        light: "bg-blue-50 hover:bg-primary/10 text-blue-950",
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
      <Slottable>{children}</Slottable>
      {icon && <div>{icon}</div>}
    </Comp>
  )
}
