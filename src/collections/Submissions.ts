import { CollectionConfig } from "payload"
import { isAdmin } from "@/access/isAdmin"
import { SendWebhook } from "@/hooks/sendWebhook"
import { SendSubmissionEmail } from "@/hooks/sendSubmissionEmail"

export const Submissions: CollectionConfig = {
  slug: "submissions",
  labels: {
    singular: "Inzending",
    plural: "Inzendingen",
  },
  access: {
    create: isAdmin, // Only admins can create via Payload API - force public to use /api/submissions route
    read: isAdmin, // Only admins can read submissions
    update: () => false,
    delete: isAdmin,
  },
  admin: {
    group: "Forms",
    defaultColumns: ["form", "createdAt"],
  },
  hooks: {
    afterChange: [SendSubmissionEmail, SendWebhook],
  },
  fields: [
    {
      name: "form",
      type: "relationship",
      relationTo: "forms",
      label: "Formulier",
      required: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: "data",
      type: "json",
      required: true,
    },
  ],
}
