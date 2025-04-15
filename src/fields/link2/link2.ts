import type { Field } from "payload"

export const link2 = (): Field => ({
  name: "link",
  type: "group",
  label: "Link",
  admin: {
    hideGutter: true,
  },
  fields: [
    {
      name: "type",
      type: "radio",
      defaultValue: "none",
      options: [
        { label: "None", value: "none" },
        { label: "Internal link", value: "reference" },
        { label: "Custom URL", value: "custom" },
      ],
      admin: {
        layout: "horizontal",
        width: "50%",
      },
    },
    {
      name: "newTab",
      type: "checkbox",
      label: "Open in new tab",
      admin: {
        width: "50%",
        style: { alignSelf: "flex-end" },
        condition: (_, siblingData) => siblingData?.type !== "none",
      },
    },
    {
      name: "reference",
      type: "relationship",
      relationTo: ["pages"],
      admin: {
        condition: (_, siblingData) => siblingData?.type === "reference",
      },
      validate: (value, { siblingData }) => {
        if (siblingData?.type === "reference") {
          if (!value || (typeof value === "object" && Object.keys(value).length === 0)) {
            return "Please select a page to link to."
          }
        }
        return true
      },
    },
    {
      name: "url",
      type: "text",
      label: "Custom URL",
      admin: {
        condition: (_, siblingData) => siblingData?.type === "custom",
      },
      validate: (value, { siblingData }) => {
        if (siblingData?.type === "custom" && (!value || value.trim() === "")) {
          return "Please enter a URL."
        }
        return true
      },
    },
    {
      name: "label",
      type: "text",
      label: "Link label",
      admin: {
        condition: (_, siblingData) => siblingData?.type !== "none",
      },
    },
  ],
})
