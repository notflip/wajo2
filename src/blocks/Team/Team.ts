import { link } from "@/fields/link/link"
import type { Block } from "payload"

export const Team: Block = {
  slug: "team",
  interfaceName: "Team",
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
      name: "links",
      type: "array",
      admin: {
        initCollapsed: true,
      },
      fields: [link()],
      maxRows: 1,
    },
    {
      name: "members",
      type: "array",
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
        },
      ],
    },
    {
      name: "showLine",
      type: "checkbox",
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
