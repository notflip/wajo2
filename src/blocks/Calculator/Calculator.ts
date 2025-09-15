import type { Block } from "payload"

export const Calculator: Block = {
  slug: "calculator",
  interfaceName: "Calculator",
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      defaultValue: "🏥 Medische Praktijk Omzet Calculator",
    },
    {
      name: "description",
      type: "textarea",
      required: true,
      defaultValue:
        "Schat uw maandelijkse afspraken en omzetpotentieel met verschillende boekingskanalen en marketingstrategieën",
    },
    {
      name: "bgColor",
      type: "select",
      admin: {
        isClearable: true,
      },
      options: [
        {
          label: "Beige",
          value: "beige",
        },
        {
          label: "Gray",
          value: "gray",
        },
        {
          label: "Blue",
          value: "blue",
        },
        {
          label: "Black",
          value: "black",
        },
      ],
    },
  ],
}
