

import { useEffect, useRef, useState } from 'react'
import './Explorer.css'
import { Screens, useScreenContext } from '../../context/ScreenContext'
import { ArrowDownBoldCircleOutline, ArrowUpBoldCircleOutline, ChevronLeft, FileOutline, FolderOpenOutline, VideoBox } from '../../assets/icons'

interface ExplorerProps {
  setActiveVideo: (filePathArray?: Array<string>) => void
}

const Explorer = ({ setActiveVideo }: ExplorerProps) => {

  const visibleItems = 6;

  const { interfaces, explorePath, exploredItems, darkMode, setScreen } = useScreenContext()

  const initRef = useRef(false)

  const [listIndex, setListIndex] = useState(0)

  const handleListUp = () => {
    if (listIndex <= 0) {
      return
    }
    setListIndex(listIndex - 1)
  }

  const handleListDown = () => {
    if (listIndex + visibleItems >= exploredItems.length) {
      return
    }
    setListIndex(listIndex + 1)
  }

  const handleFolderClick = (item?: string) => {
    if (item) {
      interfaces.current.explorer.list([...explorePath, item])
    } else {
      const listToPop = [...explorePath]
      listToPop.pop()
      interfaces.current.explorer.list(listToPop)
    }
    setListIndex(0)
  }

  const handleVideoFileClick = (item: string) => {
    setActiveVideo([...explorePath, item])
    setScreen(Screens.videoPlayer)
  }

  useEffect(() => {
    if (!initRef.current) {
      initRef.current = true
      interfaces.current.explorer.list([])
    }
  }, [interfaces])

  return (
    <div className="explorer">
      <div className="explorer__navigation explorer__header">
        <div className='explorer__header__path'>
          {explorePath.length > 0 && (
            <button
              onClick={() => handleFolderClick()}
            >
              <ChevronLeft />
            </button>
          )}
          <p>
            {explorePath.length === 0 && <span className='explorer__header__spacer'>/</span>}
            {explorePath.length === 1 && (
              <>
                <span className='explorer__header__spacer'>/</span>
                <span>{explorePath[0]}</span>
              </>
            )}
            {explorePath.length > 1 && (
              <>
                <span className='explorer__header__spacer'>/</span>
                <span>...</span>
                <span className='explorer__header__spacer'>/</span>
                <span>{explorePath[explorePath.length - 1]}</span>
              </>
            )}
          </p>
        </div>
        <button onClick={handleListUp}>
          <ArrowUpBoldCircleOutline />
        </button>
      </div>
      {(listIndex + visibleItems) > visibleItems && <i className={`explorer__list__hint explorer__list__hint--${darkMode}`}>Scroll up to see more...</i>}
      <ul className='explorer__list'>
        {exploredItems.filter((_, index) => index >= listIndex && index < (listIndex + visibleItems)).map(item => (
          <li key={item.name} className='explorer__list__item'>
            <div className='explorer__list__item__icon'>
              {item.isFolder && <button onClick={() => handleFolderClick(item.name)}><FolderOpenOutline /></button>}
              {!item.isFolder && (() => {
                if (
                  item.name.endsWith('.avi') ||
                  item.name.endsWith('.mp4')
                ) {
                  return (
                    <button onClick={() => handleVideoFileClick(item.name)}>
                      <VideoBox />
                    </button>
                  )
                }
                return <FileOutline />
              })()}
            </div>
            <p>
              {item.name.length > 20 ? `${item.name.substring(0, 17)}...` : item.name}
            </p>
          </li>
        ))}
      </ul>
      {(listIndex + visibleItems) < exploredItems.length && <i className={`explorer__list__hint explorer__list__hint--${darkMode}`}>Scroll down to see more...</i>}
      <div className="explorer__navigation">
        <button onClick={handleListDown}>
          <ArrowDownBoldCircleOutline />
        </button>
      </div>
    </div>
  )
}

export default Explorer
