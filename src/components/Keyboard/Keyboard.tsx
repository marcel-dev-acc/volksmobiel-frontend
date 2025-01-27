import React from 'react'
import './Keyboard.css'
import {
  Alphabetical,
  AlphabeticalVariant,
  BackSpaceOutline,
  KeyboardCloseOutline,
  Numeric,
  Symbol
} from '../../assets/icons'
import {useScreenContext} from '../../context/ScreenContext'

type KeysState = 'alpha' | 'alpha-caps' | 'number' | 'symbol'

const Keyboard = (): JSX.Element => {
  const {setShowKeyboard, keyboardMutator} = useScreenContext()

  const alphaKeys = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm']
  ]

  const numericKeys = [
    ['0', '1', '2', '3', '4'],
    ['5', '6', '7', '8', '9']
  ]

  const symbolKeys = [
    ['@', '£', '#', '$', '%', '^', '&', '*'],
    ['(', ')', '{', '}', '[', ']', '!'],
    [';', ':', '\'', '"', '\\', '|', '/'],
    ['`', '~', ',', '.', '<', '>'],
    ['-', '+', '=', '_']
  ]

  const [keyState, setKeysState] = React.useState<KeysState>('alpha')
  const [keys, setKeys] = React.useState(alphaKeys)

  const handleKeyPress = (key: string): void => {
    if (keyboardMutator.current) {
      keyboardMutator.current(prev => `${prev}${key}`)
    }
  }

  const handleBackSpacePress = (): void => {
    if (keyboardMutator.current) {
      keyboardMutator.current(prev => prev.substring(0, prev.length - 1))
    }
  }

  return (
    <div className="keyboard">
      <div className="keyboard__keys">
        {keys.map((keyRow, idx) => (
          <div key={idx} className="keyboard__keys__row">
            {keyRow.map(key => (
              <button
                key={key}
                className="keyboard__keys__key"
                onClick={() => handleKeyPress(key)}>
                {key}
              </button>
            ))}
          </div>
        ))}
        <div className="keyboard__keys__row">
          <button
            className="keyboard__keys__key"
            onClick={() => handleKeyPress('?')}>
            ?
          </button>
          <button
            className="keyboard__keys__key"
            onClick={() => handleKeyPress(' ')}
            style={{width: '50%'}}>
            Space
          </button>
          <button
            className="keyboard__navigation-btn"
            style={{width: '30px'}}
            onClick={handleBackSpacePress}>
            <BackSpaceOutline />
          </button>
        </div>
      </div>
      <div className="keyboard__footer__keys">
        {keyState !== 'symbol' && (
          <button
            className="keyboard__navigation-btn"
            onClick={() => {
              setKeysState('symbol')
              setKeys(symbolKeys)
            }}>
            <Symbol />
          </button>
        )}
        {keyState !== 'alpha' && (
          <button
            className="keyboard__navigation-btn"
            onClick={() => {
              setKeysState('alpha')
              setKeys(alphaKeys)
            }}>
            <Alphabetical />
          </button>
        )}
        {keyState !== 'alpha-caps' && (
          <button
            className="keyboard__navigation-btn"
            onClick={() => {
              setKeysState('alpha-caps')
              setKeys(
                alphaKeys.map(keyRow =>
                  keyRow.map(key => key.toUpperCase())
                )
              )
            }}>
            <AlphabeticalVariant />
          </button>
        )}
        {keyState !== 'number' && (
          <button
            className="keyboard__navigation-btn"
            onClick={() => {
              setKeysState('number')
              setKeys(numericKeys)
            }}>
            <Numeric />
          </button>
        )}
        <button
          className="keyboard__navigation-btn"
          onClick={() => setShowKeyboard(false)}>
          <KeyboardCloseOutline />
        </button>
      </div>
    </div>
  )
}

export default Keyboard
