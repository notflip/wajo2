"use client"

import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

import { ArrowLeft, ArrowRight } from "lucide-react"

import { useRef } from "react"
import { NavigationOptions } from "swiper/types"
import { DynamicIcon } from "@/components/dynamic-icon"

type SliderProps = {
  items: Array<{ title: string; content: string; icon: any }>
}

export const Slider: React.FC<SliderProps> = (props) => {
  const { items } = props

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
        wrapperClass="items-stretch"
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        slidesPerView={1}
        spaceBetween={16}
        breakpoints={{
          768: {
            slidesPerView: 2.1,
          },
          1024: {
            slidesPerView: 3.1,
            spaceBetween: 32,
          },
        }}
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
            return (
              <SwiperSlide
                className="bg-white p-8 rounded-[16px] !h-auto"
                key={index}
              >
                {item.icon && (
                  <div className="inline-flex rounded-full mb-8 p-4 bg-secondary">
                    <DynamicIcon iconName={item.icon} size={32} className="" />
                  </div>
                )}
                <h4 className="mb-8">{item.title}</h4>
                <p>{item.content}</p>
              </SwiperSlide>
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
