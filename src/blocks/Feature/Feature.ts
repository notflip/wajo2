import { link } from "@/fields/link/link"
import {
  BlocksFeature,
  BoldFeature,
  HeadingFeature,
  ItalicFeature,
  lexicalEditor,
  LinkFeature,
  ParagraphFeature,
} from "@payloadcms/richtext-lexical"
import type { Block } from "payload"

export const Feature: Block = {
  slug: "feature",
  interfaceName: "Feature",
  fields: [
    {
      name: "subtitle",
      type: "text",
      admin: {
        description:
          "Indien dit ingevuld is, komt deze kleine titel boven de hoofd titel in een kader staan",
      },
    },
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      type: "richText",
      name: "content",
      label: "Content",
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          HeadingFeature({
            enabledHeadingSizes: ["h4", "h5"],
          }),
        ],
      }),
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "imageNoFill",
      type: "checkbox",
      admin: {
        description:
          "Vink dit aan indien de afbeelding niet de grootte van de container mag opnemen, bijvoorbeeld voor screenshots",
      },
    },
    {
      name: "variant",
      type: "select",
      defaultValue: "imageLeft",
      options: [
        {
          label: "Image Left",
          value: "imageLeft",
        },
        {
          label: "Image Right",
          value: "imageRight",
        },
      ],
    },
  ],
}
export default Feature
