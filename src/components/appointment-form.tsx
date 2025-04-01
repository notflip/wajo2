"use client"

import { Form } from "@/components/ui/form"
import {
  ContactFormValues,
  getAppointmentFormSchema,
} from "@/lib/contact-form.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useWatch } from "react-hook-form"
import { TextField } from "@/form/TextField"
import { EmailField } from "@/form/EmailField"
import { SelectField } from "@/form/SelectField"
import { TextareaField } from "@/form/TextareaField"
import { CheckboxField } from "@/form/CheckboxField"
import { useState } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AppointmentForm as AppointmentFormType } from "@payload-types"
import { slugify } from "@/lib/utils"

import AnimatedButton from "@/components/interface/AnimatedButton"

export function AppointmentForm({
  types,
}: {
  types: AppointmentFormType["types"]
}) {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(getAppointmentFormSchema()),
    defaultValues: {
      afspraakType: "",
      naam: "",
      email: "",
      telefoon: "",
      behandeling: "",
      boodschap: "",
      accepteer: false,
    },
  })

  const safeTypes = (types || []).filter((t) => t.title)

  const typeOptions = safeTypes.map((item) => ({
    value: slugify(item.title),
    label: item.title,
  }))

  // Replace your current selectedTypeId line with:
  const selectedTypeId = useWatch({
    control: form.control,
    name: "afspraakType",
  })

  // Auto populate the first treatment upon selection of type
  // useEffect(() => {
  //   if (selectedTypeId) {
  //     const currentType = safeTypes.find(
  //       (item) => slugify(item.title) === selectedTypeId,
  //     )
  //     if (currentType) {
  //       const mappedTreatments = (currentType.treatments || []).map((treatment) => ({
  //         value: slugify(treatment.title),
  //         label: treatment.title,
  //       }))
  //       const treatmentOptions = [
  //         ...mappedTreatments,
  //         { value: slugify("Andere Behandeling"), label: "Andere Behandeling" },
  //       ]
  //       // Set the treatment field to the first option as default
  //       form.setValue("treatment", treatmentOptions[0].value)
  //     }
  //   }
  // }, [selectedTypeId, safeTypes, form])

  // Dynamically generate the treatment options based on the selected type
  const mappedTreatments =
    safeTypes
      .find((item) => slugify(item.title) === selectedTypeId)
      ?.treatments?.map((treatment) => ({
        value: slugify(treatment.title),
        label: treatment.title,
      })) ?? []

  const treatmentOptions = [
    ...mappedTreatments,
    { value: "andere-behandelingen", label: "Andere Behandeling" },
  ]

  async function onSubmit(data: ContactFormValues) {
    setError(null)
    setSuccess(null)
    setLoading(true)

    try {
      const response = await fetch("/api/submissions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          form: "Afspraak Maken Formulier",
          data: data,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        setLoading(false)
        setError(
          errorData.message || "Er deed zich een fout voor bij het verzenden.",
        )
        return
      }

      const result = await response.json()
      setSuccess("Bedankt voor je aanvraag!")
      console.log("Submission successful:", result)
      setLoading(false)
    } catch (error) {
      console.error("Error submitting form:", error)
      setError(
        "Een overwachte fout heeft zich voorgedaan, neem contact op met een administrator",
      )
      setLoading(false)
    }
  }

  return (
    <div>
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertTitle>Foutmelding</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {success && (
        <Alert variant="success" className="mb-4">
          <AlertTitle>Succes</AlertTitle>
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      {!success && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
            method="POST"
          >
            {safeTypes.length > 0 && (
              <SelectField
                name="afspraakType"
                label="Type afspraak"
                control={form.control}
                options={typeOptions}
              />
            )}
            {treatmentOptions.length > 0 && (
              <SelectField
                name="behandeling"
                label="Kies een behandeling"
                control={form.control}
                options={treatmentOptions}
              />
            )}
            <TextField label="Naam" control={form.control} name="naam" />
            <EmailField
              name="email"
              label="E-mail adres"
              control={form.control}
            />
            <TextField
              name="telefoon"
              label="Telefoonnummer"
              control={form.control}
            />
            <TextareaField
              name="boodschap"
              control={form.control}
              label="Heb je opmerkingen?"
              placeholder="Typ uw bericht..."
            />
            <CheckboxField
              name="accepteer"
              label="Ik accepteer de voorwaarden"
              control={form.control}
            />
            <AnimatedButton asChild type="submit" disabled={loading}>
              {loading ? <span>Laden...</span> : <span>Verzenden</span>}
            </AnimatedButton>
          </form>
        </Form>
      )}
    </div>
  )
}
