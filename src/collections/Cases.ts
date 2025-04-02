import { isAuthenticated } from "@/access/isAuthenticated"
import { isAnyone } from "@/access/isAnyone"
import { CollectionConfig } from "payload"
import { slugField } from "@/fields/slug"
import beforeDuplicate from "@/hooks/beforeDuplicateSlugged"

export const Cases: CollectionConfig = {
  slug: "cases",
  labels: {
    singular: "Case",
    plural: "Cases",
  },
  access: {
    create: isAuthenticated,
    delete: isAuthenticated,
    read: isAnyone,
    update: isAuthenticated,
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug"],
  },
  versions: {
    maxPerDoc: 20,
    drafts: {
      autosave: {
        interval: 500,
      },
    },
  },
  hooks: {
    beforeValidate: [beforeDuplicate],
  },
  fields: [
    ...slugField("title"),
    {
      type: "text",
      name: "title",
      required: true,
    },
  ],
}
