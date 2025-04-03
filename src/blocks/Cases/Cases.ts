import type { Block } from "payload"
import { link } from "@/fields/link/link"

export const Cases: Block = {
  slug: "cases",
  interfaceName: "Cases",
  labels: {
    singular: "Cases",
    plural: "Cases",
  },
  fields: [
    {
      name: "badge",
      type: "text",
      required: true,
    },
    {
      name: "title",
      type: "text",
      required: true,
    },
    link({}),
  ],
}
export default Cases
