

import { useState } from 'react'
import './VideoPlayer.css'
import { Play } from '../../assets/icons'
import { useScreenContext } from '../../context/ScreenContext'


const VideoPlayer = () => {

  const {interfaces} = useScreenContext()

  const [state, setState] = useState<'explorer' | 'player'>('player')
  const [activeTitle, setActiveTitle] = useState('Two and a half men - 101')

  const handlePlayClick = () => {
    interfaces.current.video.play()
  }

  return (
    <div className="video-player">
      {state === 'player' && (
        <div className='video-player__player-container'>
          <h1>{activeTitle}</h1>
          <div className='video-player__fake-player'>
            <button onClick={handlePlayClick}>
              <Play />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default VideoPlayer
