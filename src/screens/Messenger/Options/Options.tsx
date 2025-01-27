import React from 'react'

import './Options.css'
import {ArrowLeftBoldCircleOutline} from '../../../assets/icons'
import type {State} from '../Messenger'

interface MessageOptionsProps {
  setState: React.Dispatch<React.SetStateAction<State>>
}

const MessageOptions = ({setState}: MessageOptionsProps): JSX.Element => {
  return (
    <div className="message-options">
      <div className="message-options__options__navigation">
        <button
          className="message-options__options__navigation-btn"
          onClick={() => setState('message-list')}>
          <ArrowLeftBoldCircleOutline />
        </button>
      </div>
      <div>
        <h1 className="message-options__options__title">
          Messenger Options
        </h1>
      </div>
      <ul className="message-options__options__list">
        <li className="message-options__options__list__item">
          <button
            className="message-options__options__list__item-btn"
            onClick={() => setState('create-message')}>
            Create Message
          </button>
        </li>
      </ul>
    </div>
  )
}

export default MessageOptions
