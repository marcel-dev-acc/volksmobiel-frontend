import React from 'react'

import './Messenger.css'
import Messages from './Messages/Messages'

const Messenger = (): JSX.Element => {
  const [state, setState] = React.useState<'message-list' | 'message'>(
    'message-list'
  )

  return (
    <div className="messenger">
      {state === 'message-list' && <Messages setState={setState} />}
      {state === 'message' && <p>Specific message</p>}
    </div>
  )
}

export default Messenger
