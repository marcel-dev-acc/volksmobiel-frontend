import React from 'react'

import './Message.css'
import {
  ArrowDownBoldCircleOutline,
  ArrowLeftBoldCircleOutline,
  ArrowUpBoldCircleOutline
} from '../../../assets/icons'
import dayjs from 'dayjs'

interface MessageProps {
  setState: React.Dispatch<
    React.SetStateAction<'message-list' | 'message'>
  >
}

const Message = ({setState}: MessageProps): JSX.Element => {
  const messageDetails = {
    id: 'uuid',
    foreignName: 'Joe Bloggs',
    messages: [
      {
        id: 'uuid',
        user: 'owner', // owner / foreign
        text: 'sdjfsdjkfs dkjfgkjdsfgks djfgksdjfgdskjfg sdkjfgksjdfg',
        time: dayjs().unix()
      },
      {
        id: 'uuid',
        user: 'foreign', // owner / foreign
        text: 'sdjfsdjkfs dkjfgkjdsfgks djfgksdjfgdskjfg sdkjfgksjdfg',
        time: dayjs().unix()
      }
    ]
  }

  return (
    <div className="message">
      <div className="message__navigation">
        <button
          className="message__navigation-btn"
          onClick={() => setState('message-list')}>
          <ArrowLeftBoldCircleOutline />
        </button>
      </div>
      <div className="message__title">
        <h1>{messageDetails.foreignName}</h1>
        <button
          className="message__navigation-btn"
          onClick={() => undefined}>
          <ArrowUpBoldCircleOutline />
        </button>
      </div>
      <ul className="message__messages">
        {messageDetails.messages.map(message => (
          <li
            key={message.id}
            className={`message__messages__item message__${message.user}`}>
            <div className="message__messages__message">
              <p>{message.text}</p>
            </div>
            <div className="message__messages__message__footer">
              <p>
                <i>{dayjs.unix(message.time).format('HH:mm:ss')}</i>
              </p>
            </div>
          </li>
        ))}
      </ul>
      <div className="message__footer">
        <button
          className="message__navigation-btn"
          onClick={() => undefined}>
          <ArrowDownBoldCircleOutline />
        </button>
      </div>
    </div>
  )
}

export default Message
