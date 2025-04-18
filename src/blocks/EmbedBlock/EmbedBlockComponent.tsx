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
  const inlineScript = script
    .replace(/^<script[^>]*>/i, "")
    .replace(/<\/script>$/i, "")
    .trim()

  return (
    <BlockContainer {...rest}>
      <div className="pt-16 lg:pt-24 flex flex-col lg:flex-row items-center justify-between gap-8">
        <div className={`w-full ${image ? "lg:w-1/2" : ""}`}>
          <div dangerouslySetInnerHTML={{ __html: html }} />
          <Script
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: inlineScript,
            }}
          ></Script>
        </div>
        {image && (
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
        )}
      </div>
    </BlockContainer>
  )
}
