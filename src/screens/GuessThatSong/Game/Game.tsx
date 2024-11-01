import React from 'react'

import './Splash.css'
import type {State} from '../GuessThatSong'

interface GuessThatSongGameProps {
  setState: React.Dispatch<React.SetStateAction<State>>
}

const GuessThatSongGame = ({
  setState
}: GuessThatSongGameProps): JSX.Element => {
  return (
    <div className="guess-that-song__picker">
      <img src="" />
      <div>
        <h1>Guess that song</h1>
        <button onClick={() => setState('picker')}>Play</button>
      </div>
    </div>
  )
}

export default GuessThatSongGame
