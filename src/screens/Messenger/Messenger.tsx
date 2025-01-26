import React from 'react'

import './Messenger.css'
import Message from './Message/Message'
import Messages from './Messages/Messages'
import {useScreenContext} from '../../context/ScreenContext'

const Messenger = (): JSX.Element => {
  const {interfaces, messages} = useScreenContext()

  const initRef = React.useRef(false)

  const [state, setState] = React.useState<'message-list' | 'message'>(
    'message-list'
  )
  const [activeId, setActiveId] = React.useState<string>()

  React.useEffect(() => {
    if (!initRef.current) {
      initRef.current = true
      interfaces.current.messages.list()
    }
  }, [interfaces])

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
