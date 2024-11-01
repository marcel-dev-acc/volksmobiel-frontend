import React from 'react'

import './Splash.css'
import type {State} from '../GuessThatSong'

interface GuessThatSongSplashProps {
  setState: React.Dispatch<React.SetStateAction<State>>
}

const GuessThatSongSplash = ({
  setState
}: GuessThatSongSplashProps): JSX.Element => {
  return (
    <div className="guess-that-song__splash">
      <img src="" />
      <div className="guess-that-song__splash__container">
        <h1>Guess that song</h1>
        <button onClick={() => setState('picker')}>Play</button>
      </div>
    </div>
  )
}

export default GuessThatSongSplash
