import type { Block } from "payload"

export const FormBlock: Block = {
  slug: "formBlock",
  interfaceName: "FormBlock",
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
