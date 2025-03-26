import React from 'react'

import './Create.css'
import {ArrowLeftBoldCircleOutline} from '../../../assets/icons'
import type {State} from '../Messenger'
import {useScreenContext} from '../../../context/ScreenContext'
import useMessages from '../../../hooks/messages'

interface CreateMessageProps {
  setState: React.Dispatch<React.SetStateAction<State>>
}

const CreateMessage = ({setState}: CreateMessageProps): JSX.Element => {
  const {showKeyboard, setShowKeyboard, keyboardMutator} =
    useScreenContext()
  const messages = useMessages()

  const [number, setNumber] = React.useState('+')
  const [message, setMessage] = React.useState('')

  const handleSendMessage = (): void => {
    messages.send({
      number,
      message
    })
    setState('message-list')
  }

  return (
    <div className="create-message">
      <div className="create-message__navigation">
        <button
          className="create-message__navigation-btn"
          onClick={() => setState('message-options')}
          disabled={showKeyboard}>
          <ArrowLeftBoldCircleOutline />
        </button>
      </div>
      <div className="create-message__form">
        <label className="create-message__form__input">
          Number
          <input
            type="text"
            value={number}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setNumber(event.target.value)
            }
            onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
              if (event.key === 'Enter') {
                keyboardMutator.current = setNumber
                setShowKeyboard(true)
              }
            }}
            disabled={showKeyboard}
          />
        </label>
        <textarea
          className="create-message__form__textarea"
          value={message}
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
            setMessage(event.target.value)
          }
          onKeyDown={(event: React.KeyboardEvent<HTMLTextAreaElement>) => {
            if (event.key === 'Enter') {
              keyboardMutator.current = setMessage
              setShowKeyboard(true)
            }
          }}
          disabled={showKeyboard}
        />
        <button
          className="create-message__form__btn"
          onClick={handleSendMessage}
          disabled={showKeyboard}>
          Send
        </button>
      </div>
    </div>
  )
}

export default CreateMessage
