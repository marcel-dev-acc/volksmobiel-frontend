import React from 'react'

import './Video.css'
import VideoPlayer from './Player/Player'
import VideoPlaylist from './Playlist/Playlist'

interface VideoProps {
  activeVideo?: Array<string>
  setActiveVideo: React.Dispatch<
    React.SetStateAction<string[] | undefined>
  >
}

const Video = ({activeVideo, setActiveVideo}: VideoProps): JSX.Element => {
  const [state, setState] = React.useState<'playlist' | 'player'>(
    'playlist'
  )

  React.useEffect(() => {
    if (activeVideo) {
      setState('player')
    }
  }, [])

  return (
    <div className="video">
      {state === 'playlist' && <VideoPlaylist />}
      {state === 'player' && (
        <VideoPlayer
          activeVideo={activeVideo}
          setActiveVideo={setActiveVideo}
        />
      )}
    </div>
  )
}

export default Video
