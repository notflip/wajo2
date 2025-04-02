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
  ],
}
