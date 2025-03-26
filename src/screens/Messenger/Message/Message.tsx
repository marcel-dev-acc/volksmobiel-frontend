import React from 'react'

import './Message.css'
import {
  ArrowDownBoldCircleOutline,
  ArrowLeftBoldCircleOutline,
  ArrowUpBoldCircleOutline
} from '../../../assets/icons'
import dayjs from 'dayjs'
import type {Message as MessageInterface} from '../../../context/types'
import {useScreenContext} from '../../../context/ScreenContext'
import type {State} from '../Messenger'

interface FullMessageProps {
  message: string
}

const FullMessage = ({message}: FullMessageProps): JSX.Element => {
  return (
    <div className="full-message">
      <p>{message}</p>
    </div>
  )
}

interface MessageProps {
  setState: React.Dispatch<React.SetStateAction<State>>
  messageDetails?: MessageInterface
}

const Message = ({
  setState,
  messageDetails
}: MessageProps): JSX.Element => {
  const {darkMode} = useScreenContext()

  const [view, setView] = React.useState<'all' | 'detail'>('all')
  const [activeMessage, setActiveMessage] = React.useState<string>()
  const [listIndex, setListIndex] = React.useState(0)
  const visibleItems = 3
  const messageTruncLength = 50

  const handleListUp = (): void => {
    if (listIndex <= 0) {
      return
    }
    setListIndex(listIndex - 1)
  }

  const handleListDown = (): void => {
    if (
      !messageDetails?.messages ||
      listIndex + visibleItems >= messageDetails?.messages.length
    ) {
      return
    }
    setListIndex(listIndex + 1)
  }

  return (
    <div className="message">
      <div className="message__title">
        <button
          className="message__navigation-btn"
          onClick={() => {
            if (view === 'all') {
              setState('message-list')
            } else {
              setView('all')
            }
          }}>
          <ArrowLeftBoldCircleOutline />
        </button>
        <h1>{messageDetails?.foreignName}</h1>
      </div>
      {view === 'detail' && activeMessage && (
        <FullMessage message={activeMessage} />
      )}
      {view === 'all' && (
        <>
          <div className="message__navigation">
            <button
              className="message__navigation-btn"
              onClick={handleListUp}>
              <ArrowUpBoldCircleOutline />
            </button>
          </div>
          {listIndex + visibleItems > visibleItems && (
            <i
              className={`message__list__hint message__list__hint--${darkMode}`}>
              Scroll up to see more...
            </i>
          )}
          <ul className="message__messages">
            {messageDetails?.messages
              .filter(
                (_, index) =>
                  index >= listIndex && index < listIndex + visibleItems
              )
              .map(message => (
                <li
                  key={message.id}
                  className={`message__messages__item message__${message.user}`}>
                  <div className="message__messages__message">
                    <span>
                      {message.text.length > messageTruncLength
                        ? `${message.text.substring(0, messageTruncLength)}...`
                        : message.text}
                    </span>
                    {message.text.length > messageTruncLength && (
                      <button
                        onClick={() => {
                          setActiveMessage(message.text)
                          setView('detail')
                        }}>
                        Read more
                      </button>
                    )}
                  </div>
                  <div className="message__messages__message__footer">
                    {message.receivedAt && (
                      <p>
                        <i>
                          {dayjs
                            .unix(message.receivedAt)
                            .format('HH:mm:ss')}
                        </i>
                      </p>
                    )}
                    {message.sentAt && (
                      <p>
                        <i>
                          {dayjs.unix(message.sentAt).format('HH:mm:ss')}
                        </i>
                      </p>
                    )}
                  </div>
                </li>
              ))}
          </ul>
          {messageDetails?.messages &&
            listIndex + visibleItems < messageDetails?.messages.length && (
              <i
                className={`message__list__hint message__list__hint--${darkMode}`}>
                Scroll down to see more...
              </i>
            )}
          <div className="message__footer">
            <button
              className="message__navigation-btn"
              onClick={handleListDown}>
              <ArrowDownBoldCircleOutline />
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default Message
