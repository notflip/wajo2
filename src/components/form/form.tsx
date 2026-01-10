"use client"

import { Form as FormType } from "@payload-types"
import { buildInitialFormState } from "@/components/form/buildInitialFormState"
import AnimatedButton from "@/components/interface/AnimatedButton"
import RichText from "@/components/RichText"
import { useRouter } from "next/navigation"
import { Fragment, useState } from "react"
import { useForm, FormProvider } from "react-hook-form"
import { fieldsMap } from "@/components/form/fieldsMap"
import Link from "next/link"

async function executeRecaptcha(action: string): Promise<string> {
  console.log("executeRecaptcha called with action:", action)
  console.log("window.grecaptcha exists:", !!(window as any).grecaptcha)
  console.log("NEXT_PUBLIC_RECAPTCHA_SITE_KEY:", process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY)

  const grecaptcha = (window as any).grecaptcha

  if (!grecaptcha?.ready || !grecaptcha?.execute) {
    console.error("reCAPTCHA not loaded!", {
      grecaptcha: !!grecaptcha,
      ready: !!grecaptcha?.ready,
      execute: !!grecaptcha?.execute
    })
    throw new Error("reCAPTCHA not loaded")
  }

  return new Promise((resolve, reject) => {
    grecaptcha.ready(() => {
      console.log("grecaptcha ready, executing...")
      grecaptcha
        .execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY, { action })
        .then((token: string) => {
          console.log("Token generated successfully, length:", token?.length)
          resolve(token)
        })
        .catch((err: any) => {
          console.error("Failed to execute grecaptcha:", err)
          reject(err)
        })
    })
  })
}

interface FormProps {
  form: FormType
}

export const Form: React.FC<FormProps> = ({ form }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState<boolean>()
  const [error, setError] = useState<{ message: string; status?: string } | undefined>()

  const {
    id: formID,
    confirmationMessage,
    confirmationType,
    redirect,
    submitButtonLabel,
    fields,
  } = form

  const formMethods = useForm({
    defaultValues: buildInitialFormState(fields as any[]),
  })

  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = formMethods

  const router = useRouter()

  const onSubmit = async (data: Record<string, any>) => {
    try {
      console.log("=== FORM SUBMIT STARTED ===")
      console.log("Form ID:", formID)
      console.log("Form data keys:", Object.keys(data))

      // Execute reCAPTCHA
      console.log("Calling executeRecaptcha...")
      const token = await executeRecaptcha("form_submit")

      console.log("Token received:", !!token)
      console.log("Token value (first 20 chars):", token?.substring(0, 20))

      const payload = {
        form: formID,
        data,
        recaptchaToken: token,
      }

      console.log("Payload being sent:", {
        form: payload.form,
        dataKeys: Object.keys(payload.data),
        hasToken: !!payload.recaptchaToken,
        tokenLength: payload.recaptchaToken?.length,
      })

      const req = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/submissions`, {
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      })

      console.log("Response status:", req.status)
      const res = await req.json()
      console.log("Response body:", res)
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
        message: err instanceof Error && err.message === "reCAPTCHA not loaded"
          ? "Beveiligingscontrole mislukt. Ververs de pagina en probeer opnieuw."
          : "Er ging iets fout. Probeer het opnieuw.",
      })
    }
  }

  if (!fields?.length) {
    return <p>No fields to render.</p>
  }

  return (
    <Fragment>
      {!isLoading && hasSubmitted && confirmationType === "message" && (
        <RichText data={confirmationMessage!} />
      )}

      {isLoading && !hasSubmitted && <p>Loading, please wait...</p>}

      {!hasSubmitted && (
        <FormProvider {...formMethods}>
          <Fragment>
            {isLoading && <p>Loading…</p>}
            {hasSubmitted && confirmationType === "message" && (
              <div>
                <RichText data={confirmationMessage!} />
              </div>
            )}
            {!hasSubmitted && (
              <form
                id="form"
                key={formID}
                onSubmit={handleSubmit(onSubmit)}
                className="max-w-xl space-y-4 scroll-mt-[300px]"
              >
                {fields.map((field, i) => {
                  //@ts-ignore
                  const FieldComponent = fieldsMap[field.blockType]
                  return (
                    <FieldComponent
                      key={i}
                      form={form}
                      {...field}
                      control={control}
                      errors={errors}
                      register={register}
                    />
                  )
                })}
                <AnimatedButton variant="foreground">
                  {submitButtonLabel ?? "Verzenden"}
                </AnimatedButton>
              </form>
            )}
          </Fragment>
        </FormProvider>
      )}
    </Fragment>
  )
}
