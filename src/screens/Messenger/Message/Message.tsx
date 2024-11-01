import React from 'react'

import './Message.css'
import {ArrowLeftBoldCircleOutline} from '../../../assets/icons'

interface MessageProps {
  setState: React.Dispatch<
    React.SetStateAction<'message-list' | 'message'>
  >
}

const Message = ({setState}: MessageProps): JSX.Element => {
  return (
    <div className="message">
      <div className="messages__navigation">
        <button
          className="messages__navigation-btn"
          onClick={() => setState('message-list')}>
          <ArrowLeftBoldCircleOutline />
        </button>
      </div>
    </div>
  )
}

export default Message
