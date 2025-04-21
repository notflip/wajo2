import { CheckboxField } from "@/blocks/FormBlock/CheckboxField"
import { TextField } from "@/blocks/FormBlock/TextField"
import { TextareaField } from "@/blocks/FormBlock/TextareaField"
import { EmailField } from "@/blocks/FormBlock/EmailField"

export const fieldsMap = {
  text: TextField,
  checkbox: CheckboxField,
  email: EmailField,
  textarea: TextareaField,
  // message: TextField,
  // number: TextField,
  // select: TextField,
  state: () => null,
  payment: () => null,
}
