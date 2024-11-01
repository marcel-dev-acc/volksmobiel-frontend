import React from 'react'

import './GuessThatSong.css'
import GuessThatSongSplash from './Splash/Splash'
import GuessThatSongPicker from './Picker/Picker'

export type State = 'splash' | 'picker' | 'game'
export enum Genre {
  rock,
  blues,
  country,
  pop
}

const GuessThatSong = (): JSX.Element => {
  const [state, setState] = React.useState<State>('splash')
  const [genre, setGenre] = React.useState<Genre | undefined>()

  return (
    <div className="guess-that-song">
      <p>{genre}</p>
      {state === 'splash' && <GuessThatSongSplash setState={setState} />}
      {state === 'picker' && (
        <GuessThatSongPicker setState={setState} setGenre={setGenre} />
      )}
    </div>
  )
}

export default GuessThatSong
