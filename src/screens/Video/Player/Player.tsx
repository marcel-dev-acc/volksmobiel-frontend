import React, {useEffect} from 'react'

import './Player.css'
import {Play} from '../../../assets/icons'
import {Screens, useScreenContext} from '../../../context/ScreenContext'

interface VideoPlayerProps {
  activeVideo?: Array<string>
}

const VideoPlayer = ({activeVideo}: VideoPlayerProps): JSX.Element => {
  const {interfaces, setScreen} = useScreenContext()

  const [title, setTitle] = React.useState('')

  const handlePlayClick = (): void => {
    if (activeVideo) {
      interfaces.current.video.play(activeVideo)
    }
  }

  const getFileName = (filePathArray: Array<string>): string => {
    const chars = 14
    const fileName = filePathArray[filePathArray.length - 1]
    if (fileName.length > 20) {
      return (
        fileName.substring(0, chars) +
        '...' +
        fileName.substring(fileName.length - chars, fileName.length)
      )
    }
    return filePathArray[filePathArray.length - 1]
  }

  useEffect(() => {
    if (activeVideo) {
      setTitle(getFileName(activeVideo))
    }
  }, [activeVideo])

  return (
    <div className="video-player">
      {activeVideo && (
        <div className="video-player__player-container">
          <h1>{title}</h1>
          <div className="video-player__fake-player">
            <button onClick={handlePlayClick}>
              <Play />
            </button>
          </div>
        </div>
      )}
      {!activeVideo && (
        <div className="video-player__information">
          <h1>Video player</h1>
          <p>Explore files to find a video to play...</p>
          <button onClick={() => setScreen(Screens.explorer)}>
            Explore
          </button>
        </div>
      )}
    </div>
  )
}

export default VideoPlayer