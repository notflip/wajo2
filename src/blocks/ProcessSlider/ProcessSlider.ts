import IconField from "@/fields/icon/IconField"
import type { Block } from "payload"

export const ProcessSlider: Block = {
  slug: "processSlider",
  interfaceName: "ProcessSlider",
  fields: [
    {
      name: "subtitle",
      type: "text",
      required: true,
    },
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "items",
      type: "array",
      fields: [
        IconField,
        {
          type: "text",
          name: "title",
          required: true,
        },
        {
          type: "textarea",
          name: "content",
          required: true,
          maxLength: 250,
        },
      ],
      maxRows: 8,
    },
  ],
}
export default ProcessSlider
