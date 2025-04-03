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
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      displayPreview: true,
      required: true,
    },
    {
      name: "callout",
      type: "group",
      fields: [
        {
          name: "content",
          type: "text",
        },
        {
          name: "image",
          type: "upload",
          relationTo: "media",
        },
      ],
    },
    {
      name: "tags",
      type: "select",
      hasMany: true,
      admin: {
        isClearable: true,
        isSortable: true,
      },
      options: [
        {
          label: "Copywriting",
          value: "copywriting",
        },
        {
          label: "Webdevelopment",
          value: "webdevelopment",
        },
        {
          label: "Webdesign",
          value: "webdesign",
        },
        {
          label: "Marketing",
          value: "marketing",
        },
      ],
    },
  ],
}
