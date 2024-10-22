

import { useEffect, useRef, useState } from 'react'
import './Explorer.css'
import { Screens, useScreenContext } from '../../context/ScreenContext'
import { ArrowDownBoldCircleOutline, ArrowUpBoldCircleOutline, ChevronLeft, DotsVertical, FileOutline, FolderOpenOutline, VideoBox } from '../../assets/icons'
import ExplorerList from './List/List'

interface ExplorerProps {
  setActiveVideo: (filePathArray?: Array<string>) => void
}

const Explorer = ({ setActiveVideo }: ExplorerProps) => {

  const visibleItems = 5;

  const { interfaces, explorePath, exploredItems, darkMode, setScreen } = useScreenContext()

  const initRef = useRef(false)

  const [state, setState] = useState<'list' | 'options'>('list')
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
      interfaces.current.explorer.list("home")
    }
  }, [interfaces])

  return (
    <div className="explorer">
      <div className="explorer__navigation explorer__header">
        <div className='explorer__header__options'>
          <button className='explorer__header__options-btn'>
            <DotsVertical />
          </button>
        </div>
        <div className="explorer__header__information">
          <div className='explorer__header__path'>
            {explorePath.length > 0 && (
              <button
                className='explorer__header__path-btn'
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
          <button className='explorer__navigation-btn' onClick={handleListUp}>
            <ArrowUpBoldCircleOutline />
          </button>
        </div>
      </div>
      {(listIndex + visibleItems) > visibleItems && <i className={`explorer__list__hint explorer__list__hint--${darkMode}`}>Scroll up to see more...</i>}
      <ExplorerList
        listIndex={listIndex}
        visibleItems={visibleItems}
        exploredItems={exploredItems}
        handleFolderClick={handleFolderClick}
        handleVideoFileClick={handleVideoFileClick}
      />
      {(listIndex + visibleItems) < exploredItems.length && <i className={`explorer__list__hint explorer__list__hint--${darkMode}`}>Scroll down to see more...</i>}
      <div className="explorer__navigation">
        <button className='explorer__navigation-btn' onClick={handleListDown}>
          <ArrowDownBoldCircleOutline />
        </button>
      </div>
    </div>
  )
}

export default Explorer
