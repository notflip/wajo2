import { bgColorMap, BlockItem, BlockType } from "@/blocks/Blocks"
import { cn } from "@/lib/utils"
import React from "react"

type BlockContainerProps = {
  blockType?: BlockType
  prevBlock?: BlockItem
  nextBlock?: BlockItem
  children: React.ReactNode
  bgColor?: string | null
  className?: string
  fullWidth?: boolean
}

export const BlockContainer: React.FC<BlockContainerProps> = (props) => {
  const {
    blockType,
    children,
    bgColor,
    className,
    nextBlock,
    prevBlock,
    fullWidth,
  } = props

  // If shared block, fetch the bgColor
  if (prevBlock?.blockType === "shared") {
    prevBlock.bgColor = prevBlock.block.blocks[0].bgColor
  }

  return (
    <section
      className={cn(
        "relative py-sm lg:py-lg",
        bgColor && prevBlock?.blockType !== "image" && !prevBlock?.bgColor
          ? "mt-sm lg:mt-lg py-lg lg:py-xl"
          : "",
        !bgColor && blockType !== "image" && prevBlock?.bgColor
          ? "mt-sm lg:mt-lg"
          : "",
        bgColor ? bgColorMap[bgColor] : "",
        bgColor && bgColor === "black" ? "text-white" : "",
        blockType === "image" && prevBlock?.blockType === "hero"
          ? "pt-0 lg:pt-0"
          : "",
        className,
      )}
    >
      {/* <div>
        <pre>bg: {JSON.stringify(bgColor)}</pre>
        <pre>prevtype: {JSON.stringify(prevBlock?.blockType)}</pre>
        <pre>prev: {JSON.stringify(prevBlock?.bgColor)}</pre>
        <pre>next: {JSON.stringify(nextBlock?.blockType)}</pre>
      </div> */}
      <div
        className={`${!fullWidth ? "mx-auto max-w-screen-2xl px-4 md:px-8 2xl:px-16" : ""}`}
      >
        {children}
      </div>
    </section>
  )
}
