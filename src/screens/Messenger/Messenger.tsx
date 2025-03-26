import React from 'react'

import './Messenger.css'
import Message from './Message/Message'
import Messages from './Messages/Messages'
import {useScreenContext} from '../../context/ScreenContext'
import MessageOptions from './Options/Options'
import CreateMessage from './Create/Create'
import useMessages from '../../hooks/messages'

export type State =
  | 'message-list'
  | 'message'
  | 'message-options'
  | 'create-message'

const Messenger = (): JSX.Element => {
  const {messages, screen} = useScreenContext()
  const messagesHook = useMessages()

  const initRef = React.useRef(false)

  const [state, setState] = React.useState<State>('message-list')
  const [activeId, setActiveId] = React.useState<string>()

  React.useEffect(() => {
    if (!initRef.current) {
      initRef.current = true
      messagesHook.get()
    }
  }, [screen])

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
      {state === 'message-options' && (
        <MessageOptions setState={setState} />
      )}
      {state === 'create-message' && <CreateMessage setState={setState} />}
    </div>
  )
}

export default Messenger
