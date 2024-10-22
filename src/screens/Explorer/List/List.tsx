import { FileOutline, FolderOpenOutline, VideoBox } from '../../../assets/icons'
import { ExploredItem } from '../../../context/interfaces/types'
import './List.css'

interface ExplorerListProps {
  listIndex: number
  visibleItems: number
  exploredItems: ExploredItem[]
  handleFolderClick: (item?: string) => void
  handleVideoFileClick: (item: string) => void
}

const ExplorerList = ({
    listIndex,
    visibleItems,
    exploredItems,
    handleFolderClick,
    handleVideoFileClick
}: ExplorerListProps) => {
  return (
    <ul className='explorer__list'>
      {exploredItems
        .sort((a, b) => a.name > b.name ? 1 : -1)
        .filter(item => !item.name.startsWith('.'))
        .filter((_, index) => index >= listIndex && index < (listIndex + visibleItems))
        .map((item, idx) => (
        <li key={item.name} className='explorer__list__item'>
          <div className='explorer__list__item__icon'>
            {item.isFolder && <button onClick={() => handleFolderClick(item.name)}><FolderOpenOutline /></button>}
            {!item.isFolder && (() => {
              if (
                item.type === "video"
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
  )
}

export default ExplorerList
