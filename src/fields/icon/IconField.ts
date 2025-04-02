import { Field } from "payload"

const IconField: Field = {
  name: "icon",
  label: "Select an Icon",
  type: "text",
  admin: {
    components: {
      Field: "@/fields/icon/IconFieldSelect",
    },
  },
}

export default IconField
