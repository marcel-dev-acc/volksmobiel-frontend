import React from 'react'

import './Messenger.css'
import Message from './Message/Message'
import Messages from './Messages/Messages'
import {messages} from './mock-messages'
// import { useScreenContext } from '../../context/ScreenContext'

const Messenger = (): JSX.Element => {
  // const {messages} = useScreenContext()

  const [state, setState] = React.useState<'message-list' | 'message'>(
    'message-list'
  )
  const [activeId, setActiveId] = React.useState<string>()

  return (
    <div className="messenger">
      {state === 'message-list' && (
        <Messages
          messages={messages}
          setState={setState}
          setActiveId={setActiveId}
        />
      )}
      {state === 'message' && (
        <Message
          setState={setState}
          messageDetails={messages.find(
            message => message.id === activeId
          )}
        />
      )}
    </div>
  )
}

export default Messenger
