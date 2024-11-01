import React from 'react'

import './Picker.css'
import {Genre, type State} from '../GuessThatSong'

interface GuessThatSongPickerProps {
  setState: React.Dispatch<React.SetStateAction<State>>
  setGenre: React.Dispatch<React.SetStateAction<Genre | undefined>>
}

const GuessThatSongPicker = ({
  setState,
  setGenre
}: GuessThatSongPickerProps): JSX.Element => {
  return (
    <div className="guess-that-song__picker">
      <div className="guess-that-song__picker-container">
        <h1>Guess that song</h1>
        <div className="guess-that-song__picker__row">
          <button
            className="guess-that-song__option"
            onClick={() => {
              setGenre(Genre.rock)
              setState('game')
            }}>
            <img src="/assets/images/guess-that-song/rock.jpg" />
            <p>Rock</p>
          </button>
          <button className="guess-that-song__option">
            <img src="/assets/images/guess-that-song/guitar.jpg" />
            <p>Country</p>
          </button>
        </div>
        <div className="guess-that-song__picker__row">
          <button className="guess-that-song__option">
            <img src="/assets/images/guess-that-song/rihanna.jpg" />
            <p>Pop</p>
          </button>
          <button className="guess-that-song__option">
            <img src="/assets/images/guess-that-song/record-player.jpg" />
            <p>Blues</p>
          </button>
        </div>
      </div>
    </div>
  )
}

export default GuessThatSongPicker
