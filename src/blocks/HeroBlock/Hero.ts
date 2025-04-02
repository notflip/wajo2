import { link } from "@/fields/link/link"
import { validateLandscapeImage } from "@/validation/validateLandscapeImage"
import type { Block } from "payload"

export const Hero: Block = {
    slug: "hero",
    interfaceName: "Hero",
    fields: [
        {
          name: "title",
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
          maxRows: 2,
        },
        {
          name: "textAlign",
          type: "select",
          defaultValue: "left",
          options: [
            {
              label: "Left",
              value: "left",
            },
            {
              label: "Center",
              value: "center",
            },
          ],
        },
      ],
}