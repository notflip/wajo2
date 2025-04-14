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
  const { blockType, children, bgColor, className, nextBlock, prevBlock, fullWidth } = props

  // If shared block, fetch the bgColor
  if (prevBlock?.blockType === "shared") {
    prevBlock.bgColor = prevBlock.block.blocks[0].bgColor
  }
  if (nextBlock?.blockType === "shared") {
    nextBlock.bgColor = nextBlock.block.blocks[0].bgColor
  }

  return (
    <section
      className={cn(
        "relative py-sm lg:py-lg",
        // bgColor && blockType !== "hero" && prevBlock?.blockType !== "image" && !prevBlock?.bgColor
        //   ? "mt-sm lg:mt-lg py-lg lg:py-xl"
        //   : "",
        bgColor && nextBlock?.bgColor && nextBlock?.bgColor !== bgColor && blockType !== "hero" ? "pb-lg lg:pb-xl" : "",
        bgColor && prevBlock?.bgColor !== bgColor ? "pt-lg lg:pt-xl" : "",
        bgColor ? bgColorMap[bgColor] : "",
        !bgColor && blockType !== "image" && prevBlock?.bgColor ? "mt-sm lg:mt-lg" : "",
        blockType === "image" && prevBlock?.blockType === "hero" ? "pt-0 lg:pt-0" : "",
        blockType === "image" ? "pb-0 lg:pb-0" : "",
        className,
      )}
    >
      {/* <div>
        <pre>block: {JSON.stringify(blockType)}</pre>
        <pre>currColor: {JSON.stringify(bgColor)}</pre>
        <pre>nextColor: {JSON.stringify(nextBlock?.bgColor)}</pre>
      </div> */}
      <div className={`${!fullWidth ? "mx-auto max-w-screen-2xl px-4 md:px-8 2xl:px-16" : ""}`}>{children}</div>
    </section>
  )
}
