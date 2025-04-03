import IconField from "@/fields/icon/IconField"
import type { Block } from "payload"

export const FeatureRows: Block = {
  slug: "featureRows",
  interfaceName: "FeatureRows",
  labels: {
    singular: "FeatureRows",
    plural: "FeatureRows",
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
    {
      name: "items",
      type: "array",
      fields: [
        IconField,
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
        {
          label: "Gray",
          value: "gray",
        },
      ],
    },
  ],
}
