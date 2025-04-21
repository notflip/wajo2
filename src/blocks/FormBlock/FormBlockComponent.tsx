"use client"

import React from "react"

import { FormBlock } from "@payload-types"
import { BlockContainer } from "@/blocks/BlockContainer"
import { Form } from "@/components/form/form"

export const FormBlockComponent: React.FC<FormBlock> = (props) => {
  if (typeof props.form === "number") {
    throw new Error("Expected form to be of type Form, but got a number.")
  }

  const { form, ...rest } = props

  return (
    <BlockContainer {...rest}>
      <div className="flex items-center pt-16 lg:pt-24">
        <Form form={form} />
      </div>
    </BlockContainer>
  )
}
