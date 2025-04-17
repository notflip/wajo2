"use client"

import React, { useState } from "react"
import Script from "next/script"
import { BlockContainer } from "@/blocks/BlockContainer"
import type { EmbedBlock } from "@payload-types"
import { cn } from "@/lib/utils"
import { ImageBox } from "@/components/ImageBox"

export const EmbedBlockComponent: React.FC<EmbedBlock> = ({
  script,
  html,
  image,
  ...rest
}) => {
  const inlineScript = script.replace(/^<script[^>]*>/i, "").replace(/<\/script>$/i, "").trim()

  return (
    <BlockContainer {...rest} className="mt-16 lg:mt-24">
      <div className="bg-beige-50 rounded-[16px] flex flex-col lg:flex-row items-stretch justify-between gap-8">
        <div className="w-full lg:w-1/2 p-8">
          <div dangerouslySetInnerHTML={{ __html: html }} />
          <Script
            id="sender-init"
            dangerouslySetInnerHTML={{
              __html: inlineScript,
            }}
          ></Script>
        </div>
        <div className="w-full lg:w-1/2 order-2 lg:order-1 relative min-h-[400px] lg:max-w-[42rem]">
          {image && (
            <ImageBox
              fill
              media={image}
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="rounded-[16px]"
            />
          )}
        </div>
      </div>
    </BlockContainer>
  )
}
