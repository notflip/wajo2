import { link } from "@/fields/link/link"
import {
  BlocksFeature,
  BoldFeature,
  ItalicFeature,
  lexicalEditor,
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
        features: ({}) => {
          return [ParagraphFeature(), BoldFeature(), ItalicFeature()]
        },
      }),
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      required: true,
    },

    // Links  Field
    // {
    //   name: "links",
    //   type: "array",
    //   admin: {
    //     initCollapsed: true,
    //   },
    //   fields: [link()],
    //   maxRows: 2,
    // },
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
    // {
    //   name: "bgColor",
    //   type: "select",
    //   defaultValue: "transparent",
    //   options: [
    //     {
    //       label: "Transparent",
    //       value: "transparent",
    //     },
    //     {
    //       label: "Pink Secondary",
    //       value: "secondary",
    //     },
    //   ],
    // },
  ],
}
export default Feature
