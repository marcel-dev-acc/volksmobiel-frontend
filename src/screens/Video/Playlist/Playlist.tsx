import React from 'react'

import './Playlist.css'
import {useScreenContext} from '../../../context/ScreenContext'
import {Close} from '../../../assets/icons'
import useVideo from '../../../hooks/video'

const VideoPlaylist = (): JSX.Element => {
  const {playlist} = useScreenContext()
  const {playPlaylist, removeFromPlaylist, getPlaylist} = useVideo()

  const initRef = React.useRef(false)

  const [nameTruncLength, setNameTruncLength] = React.useState(20)

  const handlePlayPlaylist = (): void => {
    playPlaylist()
  }

  const handleRemoveFromPlaylist = (id: string): void => {
    removeFromPlaylist(id)
    getPlaylist()
  }

  const handleWindowResize = (): void => {
    setNameTruncLength(Math.floor(window.innerWidth * 0.5 * 0.1))
  }

  React.useEffect(() => {
    if (!initRef.current) {
      initRef.current = true
      getPlaylist()
    }

    handleWindowResize()
    window.addEventListener('resize', handleWindowResize)
    return (): void =>
      window.removeEventListener('resize', handleWindowResize)
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
            <p>
              {item.name.length > nameTruncLength
                ? `${item.name.substring(0, nameTruncLength - 3)}...`
                : item.name}
            </p>
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
