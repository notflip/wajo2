import type { Block } from "payload"

export const FormBlock: Block = {
  slug: "formBlock",
  fields: [
    {
      name: "form",
      type: "relationship",
      relationTo: "forms",
      required: true,
    },
  ],
  labels: {
    plural: "Form Blocks",
    singular: "Form Block",
  },
}
