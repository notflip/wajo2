"use client"

import React from "react"
import { motion } from "motion/react"

type MarqueeProps = {
  text: string[]
  from: string | number
  to: string | number
  repeatCount?: number
}

const Marquee = ({ text, from, to, repeatCount = 20 }: MarqueeProps) => {
  const repeatedItems: any[] = []

  for (let i = 0; i < repeatCount; i++) {
    text.forEach((item, index) => {
      repeatedItems.push(
        <span className="whitespace-nowrap" key={`text-${i}-${index}`}>
          {item}
        </span>,
      )
      // Add a dot after each text item.
      repeatedItems.push(
        <span
          className="h-1.5 w-1.5 rounded-full bg-black"
          key={`dot-${i}-${index}`}
        ></span>,
      )
    })
  }

  return (
    <div className="flex overflow-hidden bg-primary py-3">
      <motion.div
        initial={{ x: from }}
        animate={{ x: to }}
        transition={{ duration: 220, repeat: Infinity, ease: "linear" }}
        className="flex items-center gap-6 mr-6"
      >
        {repeatedItems}
      </motion.div>
      <motion.div
        initial={{ x: from }}
        animate={{ x: to }}
        transition={{
          duration: 100 + text.length * 100,
          repeat: Infinity,
          ease: "linear",
        }}
        className="flex items-center gap-6"
      >
        {repeatedItems}
      </motion.div>
    </div>
  )
}

export default Marquee
