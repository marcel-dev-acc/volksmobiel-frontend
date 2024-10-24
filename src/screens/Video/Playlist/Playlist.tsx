import React from 'react'

import './Playlist.css'
import {useScreenContext} from '../../../context/ScreenContext'
import {Close} from '../../../assets/icons'

const VideoPlaylist = (): JSX.Element => {
  const {interfaces, playlist} = useScreenContext()

  const initRef = React.useRef(false)

  const handlePlayPlaylist = (): void => {
    interfaces.current.video.playPlaylist()
  }

  const handleRemoveFromPlaylist = (id: string): void => {
    interfaces.current.video.removeFromPlaylist(id)
    interfaces.current.video.getPlaylist()
  }

  React.useEffect(() => {
    if (!initRef.current) {
      initRef.current = true
      interfaces.current.video.getPlaylist()
    }
  }, [])

  return (
    <div className="video-playlist">
      <button
        className="video-playlist__play-all-btn"
        onClick={handlePlayPlaylist}>
        Play all
      </button>
      <ul className="video-playlist__list">
        {playlist.video.map(item => (
          <li key={item.id} className="video-playlist__list__item">
            <p>{`${item.name.substring(0, 20)}...`}</p>
            <button onClick={() => handleRemoveFromPlaylist(item.id)}>
              <Close />
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default VideoPlaylist
