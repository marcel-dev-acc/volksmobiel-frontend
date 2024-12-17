import React from 'react'

import './Messenger.css'
import Message from './Message/Message'
import Messages from './Messages/Messages'

const Messenger = (): JSX.Element => {
  const [state, setState] = React.useState<'message-list' | 'message'>(
    'message-list'
  )

  return (
    <div className="messenger">
      {state === 'message-list' && <Messages setState={setState} />}
      {state === 'message' && <Message setState={setState} />}
    </div>
  )
}

export default Messenger
