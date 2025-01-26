import React from 'react'

import './Messages.css'
import type {Message} from '../../../context/interfaces/types'
import {
  ArrowDownBoldCircleOutline,
  ArrowUpBoldCircleOutline
} from '../../../assets/icons'
import {useScreenContext} from '../../../context/ScreenContext'

interface MessagesProps {
  messages: Array<Message>
  setState: React.Dispatch<
    React.SetStateAction<'message-list' | 'message'>
  >
  setActiveId: React.Dispatch<React.SetStateAction<string | undefined>>
}

const Messages = ({
  messages,
  setState,
  setActiveId
}: MessagesProps): JSX.Element => {
  const {darkMode} = useScreenContext()

  const [listIndex, setListIndex] = React.useState(0)
  const [visibleItems, setVisibleItems] = React.useState(5)
  const [nameTruncLength, setNameTruncLength] = React.useState(20)

  const handleListUp = (): void => {
    if (listIndex <= 0) {
      return
    }
    setListIndex(listIndex - 1)
  }

  const handleListDown = (): void => {
    if (listIndex + visibleItems >= messages.length) {
      return
    }
    setListIndex(listIndex + 1)
  }

  const handleWindowResize = (): void => {
    setNameTruncLength(Math.floor(window.innerWidth * 0.5 * 0.1))
    setVisibleItems(Math.floor(window.innerHeight * 0.01))
  }

  React.useEffect(() => {
    handleWindowResize()
    window.addEventListener('resize', handleWindowResize)
    return (): void =>
      window.removeEventListener('resize', handleWindowResize)
  }, [])

  console.log('MMM', messages)

  return (
    <div className="messages">
      <div className="messages__navigation">
        <button
          className="messages__navigation-btn"
          onClick={handleListUp}>
          <ArrowUpBoldCircleOutline />
        </button>
      </div>
      {listIndex + visibleItems > visibleItems && (
        <i
          className={`messages__list__hint messages__list__hint--${darkMode}`}>
          Scroll up to see more...
        </i>
      )}
      <ul className="messages__list">
        {messages
          .filter(
            (_, index) =>
              index >= listIndex && index < listIndex + visibleItems
          )
          .map(message => (
            <li key={message.id} className="messages__list__item">
              <button
                className="messages__list__item-btn"
                onClick={() => {
                  setActiveId(message.id)
                  setState('message')
                }}>
                <p>
                  {message.foreignName.length > nameTruncLength
                    ? `${message.foreignName.substring(0, nameTruncLength - 3)}...`
                    : message.foreignName}
                </p>
              </button>
            </li>
          ))}
      </ul>
      {listIndex + visibleItems < messages.length && (
        <i
          className={`messages__list__hint messages__list__hint--${darkMode}`}>
          Scroll down to see more...
        </i>
      )}
      <div className="messages__navigation">
        <button
          className="messages__navigation-btn"
          onClick={handleListDown}>
          <ArrowDownBoldCircleOutline />
        </button>
      </div>
    </div>
  )
}

export default Messages
