import IconField from "@/fields/icon/IconField"
import type { Block } from "payload"

export const Cards: Block = {
  slug: "cards",
  interfaceName: "Cards",
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
  ],
}
