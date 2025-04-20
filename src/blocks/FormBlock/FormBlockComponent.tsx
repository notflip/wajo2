"use client"

import React, { Fragment, useState } from "react"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"

import { Form as FormType } from "@payload-types"
import { Form } from "@/components/ui/form"
import RichText from "@/components/RichText"
import AnimatedButton from "@/components/interface/AnimatedButton"
import { CheckboxField } from "@/blocks/FormBlock/CheckboxField"
import { TextField } from "@/blocks/FormBlock/TextField"
import { TextareaField } from "@/blocks/FormBlock/TextareaField"
import { EmailField } from "@/blocks/FormBlock/EmailField"
import { buildInitialFormState } from "@/blocks/FormBlock/buildInitialFormState"
import { BlockContainer } from "@/blocks/BlockContainer"

const fields = {
  text: TextField,
  checkbox: CheckboxField,
  email: EmailField,
  textarea: TextareaField,
  // country: TextField,
  // message: TextField,
  // number: TextField,
  // select: TextField,
  state: () => null,
  payment: () => null,
}

export type FormBlockType = {
  blockType?: "formBlock"
  form: FormType
}

export const FormBlockComponent: React.FC<FormBlockType> = (props) => {
  if (typeof props.form === "number") {
    throw new Error("Expected form to be of type Form, but got a number.")
  }

  const {
    form: formFromProps,
    form: {
      id: formID,
      confirmationMessage,
      confirmationType,
      redirect,
      submitButtonLabel,
    } = {},
    ...rest
  } = props

  const formMethods = useForm({
    defaultValues: buildInitialFormState(formFromProps.fields as Array<any>),
  })

  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = formMethods

  const [isLoading, setIsLoading] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState<boolean>()
  const [error, setError] = useState<{ message: string; status?: string } | undefined>()
  const router = useRouter()

  const onSubmit = async (data: Record<string, any>) => {
    try {
      const req = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/submissions`, {
        body: JSON.stringify({
          form: formID,
          data,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      })

      const res = await req.json()
      if (req.status >= 400) {
        setIsLoading(false)
        setError({
          message: res.errors?.[0]?.message || "Internal Server Error",
          status: res.status,
        })

        return
      }

      setIsLoading(false)
      setHasSubmitted(true)

      if (confirmationType === "redirect" && redirect) {
        const { url } = redirect
        const redirectUrl = url
        if (redirectUrl) router.push(redirectUrl)
      }
    } catch (err) {
      console.warn(err)
      setIsLoading(false)
      setError({
        message: "Something went wrong.",
      })
    }
  }

  return (
    <BlockContainer {...rest}>
      <div className="flex items-center pt-16 lg:pt-24">
        {!isLoading && hasSubmitted && confirmationType === "message" && (
          <RichText data={confirmationMessage!} />
        )}

        {isLoading && !hasSubmitted && <p>Loading, please wait...</p>}

        {!hasSubmitted && (
          <Form {...formMethods}>
            <div className="container">
              <form
                key={formID}
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4 mx-auto"
                method="POST"
              >
                {formFromProps &&
                  formFromProps.fields &&
                  formFromProps.fields.map((field, index) => {
                    // @ts-ignore
                    const Field: React.FC<any> = fields?.[field.blockType]

                    return (
                      <Fragment key={index}>
                        <Field
                          form={formFromProps}
                          {...field}
                          control={control}
                          errors={errors}
                          register={register}
                        />
                      </Fragment>
                    )
                  })}

                <AnimatedButton>{submitButtonLabel ?? "Verzenden"}</AnimatedButton>
              </form>
            </div>
          </Form>
        )}
      </div>
    </BlockContainer>
  )
}
