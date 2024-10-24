import React from 'react'

import './Video.css'
import VideoPlayer from './Player/Player'
import VideoPlaylist from './Playlist/Playlist'

interface VideoProps {
  activeVideo?: Array<string>
}

const Video = ({activeVideo}: VideoProps): JSX.Element => {
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
      {state === 'player' && <VideoPlayer activeVideo={activeVideo} />}
    </div>
  )
}

export default Video
