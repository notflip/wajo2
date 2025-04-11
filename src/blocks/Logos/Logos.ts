import type { Block } from "payload"

export const Logos: Block = {
  slug: "logos",
  interfaceName: "Logos",
  fields: [
    {
      name: "items",
      type: "array",
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          required: true,
        },
      ],
    },
  ],
}
