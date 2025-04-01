"use client"

import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import Image from "next/image"

import { ArrowLeft, ArrowRight } from "lucide-react"

import { Media } from "@payload-types"
import { useRef } from "react"
import { NavigationOptions } from "swiper/types"

type SliderProps = {
  items: Array<{ image?: number | Media }>
  slideHeight?: number
}

export const Slider: React.FC<SliderProps> = (props) => {
  const { items, slideHeight = 400 } = props

  const prevRef = useRef(null)
  const nextRef = useRef(null)

  if (items.length === 0) {
    return null
  }

  return (
    <div>
      <Swiper
        modules={[Navigation, Pagination]}
        pagination={{
          clickable: true,
          el: ".swiper-pagination",
        }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        slidesPerView="auto"
        spaceBetween={32}
        style={{
          overflow: "visible",
          cursor: "grab",
          userSelect: "none",
        }}
        onInit={(swiper) => {
          ;(swiper.params.navigation as NavigationOptions).prevEl =
            prevRef.current
          ;(swiper.params.navigation as NavigationOptions).nextEl =
            nextRef.current
          swiper.navigation.init()
          swiper.navigation.update()
        }}
      >
        {items &&
          items.map((item, index) => {
            if (!item.image) {
              return null
            }

            const width = (item.image as Media).width!
            const height = (item.image as Media).height!
            const computedWidth = Math.round((width / height) * slideHeight)
            const media = item.image as Media

            return (
              item.image && (
                <SwiperSlide
                  key={index}
                  style={{
                    overflow: "hidden",
                    width: computedWidth,
                    borderRadius: "20px",
                  }}
                >
                  <Image
                    src={media.url!}
                    alt={media.alt ?? "slider image"}
                    width={computedWidth}
                    height={slideHeight}
                    sizes="(max-width: 767px) 500px, 800px"
                    style={{ objectFit: "contain" }}
                  />
                </SwiperSlide>
              )
            )
          })}

        <div className="mt-6 flex items-center justify-between">
          <div>
            <div
              className="swiper-pagination"
              style={{
                position: "relative",
                textAlign: "left",
                bottom: 0,
              }}
            />
          </div>
          <div className="flex items-center gap-2">
            <button
              aria-label="Previous slide"
              className="bg-white rounded-full w-10 h-10 flex items-center justify-center"
              ref={prevRef}
            >
              <ArrowLeft />
            </button>
            <button
              aria-label="Next slide"
              className="bg-white rounded-full w-10 h-10 flex items-center justify-center"
              ref={nextRef}
            >
              <ArrowRight />
            </button>
          </div>
        </div>
      </Swiper>
    </div>
  )
}
