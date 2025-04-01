"use client"

import { cva } from "class-variance-authority"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Slottable, Slot } from "@radix-ui/react-slot"
import { ButtonHTMLAttributes, ReactNode } from "react"

type Props = {
  children: ReactNode
  variant?: "default" | "outline" | "link"
  color?: "light" | "dark"
  hasArrow?: boolean
  asChild?: boolean
} & ButtonHTMLAttributes<HTMLButtonElement>

const animatedButtonVariants = cva(
  "group relative inline-flex items-center px-5 py-3 justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary hover:bg-primary/90 text-black",
        outline: "bg-transparent border",
        link: "bg-transparent px-3",
      },
      color: {
        light: "",
        dark: "text-black",
      },
    },
    compoundVariants: [
      { variant: "outline", color: "dark", className: "border-black" },
      {
        variant: "outline",
        color: "light",
        className: "border-white text-white hover:bg-white/30",
      },
    ],
    defaultVariants: {
      variant: "default",
      color: "dark",
    },
  },
)

const arrowContainerVariants = cva(
  "ml-2 relative flex items-center justify-center w-8 h-8 rounded-full transform transition-transform duration-300 ease-in-out group-hover:translate-x-1",
  {
    variants: {
      variant: {
        default: "",
        outline: "",
        link: "-ml-2",
      },
      color: {
        light: "bg-white bg-opacity-30",
        dark: "bg-white bg-opacity-30",
      },
    },
    compoundVariants: [
      { variant: "outline", className: "bg-black bg-opacity-100 text-white" },
      {
        variant: "outline",
        color: "light",
        className: "bg-white bg-opacity-30",
      },
      { variant: "link", color: "light", className: "bg-transparent" },
    ],
    defaultVariants: {
      color: "dark",
    },
  },
)

export default function AnimatedButton({
  children,
  variant = "default",
  color = "dark",
  hasArrow = true,
  asChild = false,
  ...props
}: Props) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      {...props}
      className={cn(
        animatedButtonVariants({ variant, color }),
        props.className,
      )}
    >
      <Slottable>{children}</Slottable>
      {hasArrow && (
        <div className={cn(arrowContainerVariants({ variant, color }))}>
          <ArrowRight size={16} />
        </div>
      )}
    </Comp>
  )
}
