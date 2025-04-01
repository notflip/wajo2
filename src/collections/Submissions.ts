import { CollectionConfig } from "payload"
import { isAdmin } from "@/access/isAdmin"
import { SendSubmissionEmail } from "@/hooks/sendSubmissionEmail"

export const Submissions: CollectionConfig = {
  slug: "submissions",
  labels: {
    singular: "Inzending",
    plural: "Inzendingen",
  },
  access: {
    create: () => true,
    read: () => true,
    update: () => false,
    delete: isAdmin,
  },
  admin: {
    group: "Forms",
    defaultColumns: ["form", "createdAt"],
  },
  hooks: {
    afterChange: [SendSubmissionEmail],
  },
  fields: [
    {
      name: "form",
      type: "text",
      label: "Formulier",
      required: true,
    },
    {
      name: "data",
      type: "json",
      required: true,
    },
  ],
}
