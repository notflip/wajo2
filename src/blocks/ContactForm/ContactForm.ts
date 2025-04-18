import type { Block } from "payload"

export const ContactForm: Block = {
  slug: "contactForm",
  interfaceName: "ContactForm",
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
  ],
}
export default ContactForm
