import React from 'react'

import type {State} from '../Explorer'
import './Options.css'
import {ArrowLeftBoldCircleOutline} from '../../../assets/icons'
import {useScreenContext} from '../../../context/ScreenContext'
import type {ExploredItem} from '../../../context/interfaces/types'

export type OptionsState = 'menu' | 'playlist'

interface ExplorerOptionsProps {
  item?: ExploredItem
  type: 'file' | 'folder'
  setState: React.Dispatch<React.SetStateAction<State>>
}

const ExplorerOptions = ({
  item,
  type,
  setState
}: ExplorerOptionsProps): JSX.Element => {
  const {interfaces, explorePath} = useScreenContext()

  const handleAddFileToPlayList = (): void => {
    if (item) {
      interfaces.current.video.addToPlaylist(item.name, [
        ...explorePath,
        item.name
      ])
    }
    setState('list')
  }

  const handleAutoPlay = (): void => {
    if (item) {
      interfaces.current.video.autoPlay([...explorePath, item.name])
    }
    setState('list')
  }

  const handlePlayAsDvd = (): void => {
    if (item) {
      interfaces.current.video.playDvd([...explorePath, item.name])
    }
    setState('list')
  }

  return (
    <div className="explorer__options">
      <div className="explorer__options__navigation">
        <button
          className="explorer__options__navigation-btn"
          onClick={() => setState('list')}>
          <ArrowLeftBoldCircleOutline />
        </button>
      </div>
      <div>
        <h1 className="explorer__options__title">{item?.name}</h1>
      </div>
      <ul className="explorer__options__list">
        {type === 'file' && (
          <>
            <li className="explorer__options__list__item">
              <button
                className="explorer__options__list__item-btn"
                onClick={handleAddFileToPlayList}>
                Add to playlist
              </button>
            </li>
            <li className="explorer__options__list__item">
              <button
                className="explorer__options__list__item-btn"
                onClick={handleAutoPlay}>
                Auto play from here
              </button>
            </li>
          </>
        )}
        {type === 'folder' && (
          <>
            <li className="explorer__options__list__item">
              <button
                className="explorer__options__list__item-btn"
                onClick={handlePlayAsDvd}>
                Play as DVD
              </button>
            </li>
          </>
        )}
      </ul>
    </div>
  )
}

export default ExplorerOptions
