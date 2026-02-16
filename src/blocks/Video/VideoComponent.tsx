import { BlockContainer } from "@/blocks/BlockContainer"
import type { Video, MuxVideo } from "@payload-types"
import MuxPlayer from "@mux/mux-player-react"

export const VideoComponent: React.FC<Video> = (props: Video) => {
  const { video, videos } = props
  const hasVideosArray = videos && videos.length > 0

  if (!hasVideosArray && !video) return null

  // Legacy: single video field
  if (!hasVideosArray) {
    const videoTyped = video as MuxVideo
    const aspectRatio = videoTyped.aspectRatio!
    const [widthRatio, heightRatio] = aspectRatio.split("/").map((v) => parseInt(v, 10))
    const isPortrait = widthRatio / heightRatio < 1

    return (
      <BlockContainer {...props} bgColor="gray">
        <MuxPlayer
          playbackId={videoTyped.playbackOptions![0].playbackId!}
          src={videoTyped.playbackOptions![0].playbackUrl!}
          poster={videoTyped.playbackOptions![0].posterUrl!}
          className={`w-full h-auto mx-auto rounded-lg ${isPortrait ? "max-w-sm" : ""}`}
        />
      </BlockContainer>
    )
  }

  // New: videos array
  const count = videos.length

  return (
    <BlockContainer {...props} bgColor="gray">
      <div
        className={`grid gap-4 ${
          count === 1 ? "grid-cols-1" : count === 2 ? "grid-cols-2" : "grid-cols-3"
        }`}
      >
        {videos.map((item, index) => {
          const videoTyped = item.video as MuxVideo

          return (
            <MuxPlayer
              key={item.id ?? index}
              playbackId={videoTyped.playbackOptions![0].playbackId!}
              src={videoTyped.playbackOptions![0].playbackUrl!}
              poster={videoTyped.playbackOptions![0].posterUrl!}
              className="w-full h-auto rounded-lg"
            />
          )
        })}
      </div>
    </BlockContainer>
  )
}
