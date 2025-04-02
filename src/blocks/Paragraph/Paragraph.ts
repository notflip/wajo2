import { link } from "@/fields/link/link"
import type { Block } from "payload"

export const Paragraph: Block = {
  slug: "paragraph",
  interfaceName: "Paragraph",
  fields: [
    {
      name: "badge",
      type: "text",
      required: true,
    },
    {
      name: "content",
      type: "textarea",
      required: true,
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
