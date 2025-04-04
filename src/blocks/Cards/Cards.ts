import IconField from "@/fields/icon/IconField"
import type { Block } from "payload"

export const Cards: Block = {
  slug: "cards",
  interfaceName: "Cards",
  labels: {
    singular: "Cards",
    plural: "Cards",
  },
  fields: [
    {
      name: "items",
      type: "array",
      fields: [
        IconField,
        {
          name: "title",
          type: "text",
          required: true,
          maxLength: 70,
        },
        {
          name: "text",
          type: "textarea",
          required: true,
          maxLength: 200,
        },
      ],
    },
    {
      name: "bgColor",
      type: "select",
      defaultValue: "transparent",
      options: [
        {
          label: "Transparent",
          value: "transparent",
        },
        {
          label: "Beige",
          value: "beige",
        },
      ],
    },
  ],
}
