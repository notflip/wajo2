import {
  JSXConvertersFunction,
  RichText as RichTextReact,
} from "@payloadcms/richtext-lexical/react"
import {
  DefaultNodeTypes,
  SerializedBlockNode,
} from "@payloadcms/richtext-lexical"
import { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical"
import { cn } from "@/lib/utils"

// import type { InlineListBlock, MediaBlock } from "@payload-types"
// import { MediaBlockComponent } from "@/blocks/MediaBlock/MediaBlockComponent"
// import { InlineListBlockComponent } from "@/blocks/InlineListBlockComponent"
import { JsonObject } from "payload"

type NodeTypes = DefaultNodeTypes | SerializedEditorState<SerializedBlockNode>

type BlockNodeProps<TBlock extends JsonObject> = {
  node: SerializedBlockNode<TBlock>
}
const jsxConverters: JSXConvertersFunction<NodeTypes> = ({
  defaultConverters,
}) => ({
  ...defaultConverters,
  blocks: {
    // mediaBlock: ({ node }: BlockNodeProps<MediaBlock>) => (
    //   <MediaBlockComponent {...node.fields} />
    // ),
    // inlineListBlock: ({ node }: BlockNodeProps<InlineListBlock>) => (
    //   <InlineListBlockComponent {...node.fields} />
    // ),
  },
})
type RichTextProps = {
  data: SerializedEditorState
} & React.HTMLAttributes<HTMLDivElement>

export default function RichText(props: RichTextProps) {
  const { data, ...rest } = props

  return (
    <RichTextReact
      converters={jsxConverters}
      className={cn("prose xl:prose-lg")}
      data={data}
      {...rest}
    />
  )
}
