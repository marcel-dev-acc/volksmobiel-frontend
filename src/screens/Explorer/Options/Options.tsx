import React from 'react'

import {useState} from 'react'
import type {State} from '../Explorer'
import './Options.css'
import ExplorerOptionsPlaylist from './Playlist/Playlist'

export type OptionsState = 'menu' | 'playlist'

interface ExplorerOptionsProps {
  setState: React.Dispatch<React.SetStateAction<State>>
}

const ExplorerOptions = ({
  setState
}: ExplorerOptionsProps): JSX.Element => {
  const [optionsState, setOptionsState] = useState<OptionsState>('menu')

  return (
    <div className="explorer__options">
      {optionsState === 'menu' && (
        <>
          <div className="explorer__options__navigation">
            <button
              className="explorer__options__navigation-btn"
              onClick={() => setState('list')}>
              Back
            </button>
          </div>
          <ul>
            <li className="explorer__options__list__item">
              <button
                className="explorer__options__list__item-btn"
                onClick={() => setOptionsState('playlist')}>
                Add to playlist
              </button>
            </li>
          </ul>
        </>
      )}
      {optionsState === 'playlist' && (
        <ExplorerOptionsPlaylist setOptionsState={setOptionsState} />
      )}
    </div>
  )
}

export default ExplorerOptions
