import { CollectionConfig } from "payload"

export const Uploads: CollectionConfig = {
  slug: "uploads",
  access: {
    read: () => true,
  },
  upload: {
    staticDir: "public/uploads",
    mimeTypes: [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ],
  },
  admin: {
    useAsTitle: "filename",
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
  ],
}
