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

  // New: videos array — single portrait video renders like legacy
  const count = videos.length

  if (count === 1) {
    const singleItem = videos[0]
    const videoTyped = singleItem.video as MuxVideo
    const aspectRatio = videoTyped.aspectRatio!
    const [widthRatio, heightRatio] = aspectRatio.split("/").map((v) => parseInt(v, 10))
    const isPortrait = widthRatio / heightRatio < 1

    return (
      <BlockContainer {...props} bgColor="gray">
        <div className={`relative rounded-lg overflow-hidden mx-auto ${isPortrait ? "max-w-sm" : ""}`}>
          <MuxPlayer
            playbackId={videoTyped.playbackOptions![0].playbackId!}
            src={videoTyped.playbackOptions![0].playbackUrl!}
            poster={videoTyped.playbackOptions![0].posterUrl!}
            className="w-full h-auto"
          />
          {singleItem.title && (
            <div
              className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none px-8 pb-8 pt-16"
              style={{ background: "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.6) 50%, transparent 100%)" }}
            >
              <p className="text-white text-lg font-semibold">{singleItem.title}</p>
            </div>
          )}
        </div>
      </BlockContainer>
    )
  }

  return (
    <BlockContainer {...props} bgColor="gray">
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {videos.map((item, index) => {
          const videoTyped = item.video as MuxVideo

          return (
            <div key={`${item.id}-${index}`} className="relative rounded-lg overflow-hidden">
              <MuxPlayer
                playbackId={videoTyped.playbackOptions![0].playbackId!}
                src={videoTyped.playbackOptions![0].playbackUrl!}
                poster={videoTyped.playbackOptions![0].posterUrl!}
                className="w-full h-auto"
              />
              {item.title && (
                <div
                  className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none px-8 pb-8 pt-16"
                  style={{ background: "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.6) 50%, transparent 100%)" }}
                >
                  <p className="text-white text-lg font-semibold">{item.title}</p>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </BlockContainer>
  )
}
