import type { Block } from "payload"

export const Video: Block = {
  slug: "video",
  interfaceName: "Video",
  fields: [
    {
      name: "video",
      label: "Video (legacy)",
      type: "relationship",
      relationTo: "mux-video",
      admin: {
        description: "Legacy single video field. Use the Videos array below for new content.",
      },
    },
    {
      name: "videos",
      label: "Videos",
      type: "array",
      maxRows: 3,
      fields: [
        {
          name: "video",
          label: "Video",
          type: "relationship",
          relationTo: "mux-video",
          required: true,
        },
        {
          name: "title",
          label: "Title",
          type: "text",
        },
      ],
    },
  ],
}

export default Video
