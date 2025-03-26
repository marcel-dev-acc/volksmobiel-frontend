import React from 'react'

import type {State} from '../Explorer'
import './Options.css'
import {ArrowLeftBoldCircleOutline} from '../../../assets/icons'
import {useScreenContext} from '../../../context/ScreenContext'
import type {ExploredItem} from '../../../context/types'
import useVideo from '../../../hooks/video'
import useSettings from '../../../hooks/settings'
import useExplorer from '../../../hooks/explorer'

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
  const {explorePath, copySrc, setCopySrc} = useScreenContext()
  const {addToPlaylist, autoPlay, playDvd} = useVideo()
  const {copyFolderContentsTo, removeFolderContents, removeFolder} =
    useSettings()
  const explorer = useExplorer()

  const [confirmDeleteFolderContents, setConfirmDeleteFolderContents] =
    React.useState(false)
  const [confirmDeleteFolder, setConfirmDeleteFolder] =
    React.useState(false)

  const handleAddFileToPlayList = (): void => {
    if (item) {
      addToPlaylist(item.name, [...explorePath, item.name])
    }
    setState('list')
  }

  const handleAutoPlay = (): void => {
    if (item) {
      autoPlay([...explorePath, item.name])
    }
    setState('list')
  }

  const handlePlayAsDvd = (): void => {
    if (item) {
      playDvd(explorePath)
    }
    setState('list')
  }

  const handleCopySrc = (): void => {
    setCopySrc(explorePath)
    setState('list')
  }

  const handlePasteHere = (): void => {
    if (copySrc) {
      copyFolderContentsTo({
        folderPath: copySrc,
        destination: explorePath
      })
    }
    explorer.list(explorePath)
    setCopySrc(undefined)
    setState('list')
  }

  const handleDeleteFolderContents = (): void => {
    removeFolderContents(explorePath)
    explorer.list(explorePath)
    setConfirmDeleteFolderContents(false)
    setState('list')
  }

  const handleDeleteFolder = (): void => {
    removeFolder(explorePath)
    explorePath.pop()
    explorer.list(explorePath)
    setConfirmDeleteFolder(false)
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
            {copySrc !== undefined && (
              <li className="explorer__options__list__item">
                <button
                  className="explorer__options__list__item-btn"
                  onClick={handlePasteHere}>
                  Paste folder contents here
                </button>
              </li>
            )}
            <li className="explorer__options__list__item">
              <button
                className="explorer__options__list__item-btn"
                onClick={handleCopySrc}>
                Copy folder contents
              </button>
            </li>
            <li className="explorer__options__list__item">
              <button
                className="explorer__options__list__item-btn"
                onClick={() => setConfirmDeleteFolderContents(true)}
                disabled={confirmDeleteFolderContents}>
                Delete folder contents
              </button>
              {confirmDeleteFolderContents && (
                <button
                  className="explorer__options__list__item-btn"
                  onClick={handleDeleteFolderContents}>
                  Confirm delete folder contents
                </button>
              )}
            </li>
            <li className="explorer__options__list__item">
              <button
                className="explorer__options__list__item-btn"
                onClick={() => setConfirmDeleteFolder(true)}
                disabled={confirmDeleteFolder}>
                Delete folder
              </button>
              {confirmDeleteFolder && (
                <button
                  className="explorer__options__list__item-btn"
                  onClick={handleDeleteFolder}>
                  Confirm delete folder
                </button>
              )}
            </li>
          </>
        )}
      </ul>
    </div>
  )
}

export default ExplorerOptions
