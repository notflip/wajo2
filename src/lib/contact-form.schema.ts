import * as z from "zod"

export function getContactFormSchema() {
  return z.object({
    naam: z.string().min(2, {
      message: "Naam moet ten minste 2 tekens zijn",
    }),
    email: z.string().email({
      message: "Gelieve een geldig e-mail adres in te voeren",
    }),
    telefoon: z.string().min(2, {
      message: "Telefoonnummer is niet geldig",
    }),
    boodschap: z.string().optional(),
    accepteer: z.boolean().refine((value) => value === true, {
      message: "Je moet akkoord gaan met de voorwaarden.",
    }),
  })
}

export type ContactFormValues = z.infer<
  ReturnType<typeof getContactFormSchema>
>
