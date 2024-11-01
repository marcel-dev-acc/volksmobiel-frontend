import React from 'react'

import './Messages.css'

interface MessagesProps {
  setState: React.Dispatch<
    React.SetStateAction<'message-list' | 'message'>
  >
}

const Messages = ({setState}: MessagesProps): JSX.Element => {
  return (
    <div className="messages">
      <ul>
        <li>
          <button onClick={() => setState('message')}>Joe Blogs</button>
        </li>
      </ul>
    </div>
  )
}

export default Messages
