import type { Block } from "payload"

export const EmbedBlock: Block = {
  slug: "embedBlock",
  interfaceName: "EmbedBlock",
  fields: [
    {
      name: "script",
      type: "textarea",
      required: true,
      admin: {
        description: "Plak hier je <script>...</script> fragment (inclusief de tags).",
      },
    },
    {
      name: "html",
      type: "textarea",
      required: true,
      admin: {
        description: "Plak het HTML-fragment (bijvoorbeeld een <div> voor de widget).",
      },
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      admin: {
        description:
          "Deze afbeelding wordt rechts van het embedded formulier getoond, indien gekozen",
      },
    },
  ],
}

export default EmbedBlock
