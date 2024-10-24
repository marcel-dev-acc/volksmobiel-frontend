import React from 'react'
import {useEffect, useRef, useState} from 'react'
import './List.css'
import {Screens, useScreenContext} from '../../../context/ScreenContext'
import {
  ArrowDownBoldCircleOutline,
  ArrowUpBoldCircleOutline,
  ChevronLeft,
  DotsHorizontal,
  DotsVertical,
  FileOutline,
  FolderOpenOutline,
  VideoBox
} from '../../../assets/icons'
import type {State} from '../Explorer'
import type {ExploredItem} from '../../../context/interfaces/types'

interface ExplorerProps {
  setActiveVideo: (filePathArray?: Array<string>) => void
  setState: React.Dispatch<React.SetStateAction<State>>
  setType: React.Dispatch<React.SetStateAction<'file' | 'folder'>>
  setItem: React.Dispatch<React.SetStateAction<ExploredItem | undefined>>
}

const ExplorerList = ({
  setActiveVideo,
  setState,
  setType,
  setItem
}: ExplorerProps): JSX.Element => {
  const visibleItems = 5

  const {interfaces, explorePath, exploredItems, darkMode, setScreen} =
    useScreenContext()

  const initRef = useRef(false)

  const [listIndex, setListIndex] = useState(0)

  const handleListUp = (): void => {
    if (listIndex <= 0) {
      return
    }
    setListIndex(listIndex - 1)
  }

  const handleListDown = (): void => {
    if (listIndex + visibleItems >= exploredItems.length) {
      return
    }
    setListIndex(listIndex + 1)
  }

  const handleFolderClick = (item?: string): void => {
    if (item) {
      interfaces.current.explorer.list([...explorePath, item])
    } else {
      const listToPop = [...explorePath]
      listToPop.pop()
      interfaces.current.explorer.list(listToPop)
    }
    setListIndex(0)
  }

  const handleVideoFileClick = (item: string): void => {
    setActiveVideo([...explorePath, item])
    setScreen(Screens.videoPlayer)
  }

  useEffect(() => {
    if (!initRef.current && explorePath.length > 0) {
      initRef.current = true
      interfaces.current.explorer.list(explorePath)
    }
    if (!initRef.current) {
      initRef.current = true
      interfaces.current.explorer.list('home')
    }
  }, [interfaces])

  return (
    <div className="explorer__list__container">
      <div className="explorer__navigation explorer__header">
        <div className="explorer__header__options">
          <button
            className="explorer__header__options-btn"
            onClick={() => {
              setType('folder')
              setState('options')
              setItem({
                name: `.../${explorePath[explorePath.length - 1]}`,
                type: null,
                isFolder: false
              })
            }}>
            <DotsVertical />
          </button>
        </div>
        <div className="explorer__header__information">
          <div className="explorer__header__path">
            {explorePath.length > 0 && (
              <button
                className="explorer__header__path-btn"
                onClick={() => handleFolderClick()}>
                <ChevronLeft />
              </button>
            )}
            <p>
              {explorePath.length === 0 && (
                <span className="explorer__header__spacer">/</span>
              )}
              {explorePath.length === 1 && (
                <>
                  <span className="explorer__header__spacer">/</span>
                  <span>{explorePath[0]}</span>
                </>
              )}
              {explorePath.length > 1 && (
                <>
                  <span className="explorer__header__spacer">/</span>
                  <span>...</span>
                  <span className="explorer__header__spacer">/</span>
                  <span>{explorePath[explorePath.length - 1]}</span>
                </>
              )}
            </p>
          </div>
          <button
            className="explorer__navigation-btn"
            onClick={handleListUp}>
            <ArrowUpBoldCircleOutline />
          </button>
        </div>
      </div>
      {listIndex + visibleItems > visibleItems && (
        <i
          className={`explorer__list__hint explorer__list__hint--${darkMode}`}>
          Scroll up to see more...
        </i>
      )}
      <ul className="explorer__list">
        {exploredItems
          .sort((a, b) => (a.name > b.name ? 1 : -1))
          .filter(item => !item.name.startsWith('.'))
          .filter(
            (_, index) =>
              index >= listIndex && index < listIndex + visibleItems
          )
          .map(item => (
            <li key={item.name} className="explorer__list__item">
              <div className="explorer__list__item__col">
                <div className="explorer__list__item__icon">
                  {item.isFolder ? (
                    <button
                      onClick={() => handleFolderClick(item.name)}
                      className="explorer__list__item__icon-btn">
                      <FolderOpenOutline />
                    </button>
                  ) : (
                    <>
                      {item.type === 'video' ? (
                        <button
                          onClick={() => handleVideoFileClick(item.name)}
                          className="explorer__list__item__icon-btn">
                          <VideoBox />
                        </button>
                      ) : (
                        <FileOutline />
                      )}
                    </>
                  )}
                </div>
                <p>
                  {item.name.length > 20
                    ? `${item.name.substring(0, 17)}...`
                    : item.name}
                </p>
              </div>
              <div className="explorer__list__item__col">
                {!item.isFolder && (
                  <button
                    className="explorer__list__item__icon-btn"
                    onClick={() => {
                      setType('file')
                      setState('options')
                      setItem(item)
                    }}>
                    <DotsHorizontal />
                  </button>
                )}
              </div>
            </li>
          ))}
      </ul>
      {listIndex + visibleItems < exploredItems.length && (
        <i
          className={`explorer__list__hint explorer__list__hint--${darkMode}`}>
          Scroll down to see more...
        </i>
      )}
      <div className="explorer__navigation">
        <button
          className="explorer__navigation-btn"
          onClick={handleListDown}>
          <ArrowDownBoldCircleOutline />
        </button>
      </div>
    </div>
  )
}

export default ExplorerList
