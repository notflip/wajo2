import type { Block } from "payload"
import { link } from "@/fields/link/link"

export const CtaBlock: Block = {
  slug: "ctaBlock",
  interfaceName: "CtaBlock",
  imageURL: "/ctaBlock.jpg",
  fields: [
    {
      name: "subtitle",
      type: "text",
      admin: {
        description:
          "Indien dit ingevuld is, komt deze kleine titel boven de hoofd titel in een kader staan",
      },
    },
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "text",
      type: "textarea",
      required: true,
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
    },
    link({}),
  ],
}
export default CtaBlock
