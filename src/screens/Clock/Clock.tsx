import React from 'react'

import './Clock.css'
import {BedClock} from '../../assets/icons'
import {useScreenContext} from '../../context/ScreenContext'
import useSettings from '../../hooks/settings'

type states = 'navigation' | 'set-system-time' | 'set-sleep'

const Clock = (): JSX.Element => {
  const {setSleepIn} = useScreenContext()
  const {shutdownAfterDelay} = useSettings()

  const [state, setState] = React.useState<states>('navigation')

  const handleSleepTimer = (time: number): void => {
    setSleepIn(time)
    shutdownAfterDelay(time)
  }

  return (
    <div className="clock">
      {state === 'navigation' && (
        <div className="clock__navigation">
          <div className="clock__navigation__row">
            <button onClick={() => setState('set-sleep')}>
              <BedClock />
            </button>
          </div>
        </div>
      )}
      {state === 'set-sleep' && (
        <div className="clock__set-sleep">
          <ul className="clock__set-sleep__list">
            <li className="clock__set-sleep__list__item">
              <button onClick={() => handleSleepTimer(120 * 60)}>
                Shutdown in 2 hours
              </button>
            </li>
            <li className="clock__set-sleep__list__item">
              <button onClick={() => handleSleepTimer(90 * 60)}>
                Shutdown in 1 hour and 30 minutes
              </button>
            </li>
            <li className="clock__set-sleep__list__item">
              <button onClick={() => handleSleepTimer(60 * 60)}>
                Shutdown in 1 hour
              </button>
            </li>
            <li className="clock__set-sleep__list__item">
              <button onClick={() => handleSleepTimer(30 * 60)}>
                Shutdown in 30 minutes
              </button>
            </li>
            <li className="clock__set-sleep__list__item">
              <button onClick={() => handleSleepTimer(15 * 60)}>
                Shutdown in 15 minutes
              </button>
            </li>
            <li className="clock__set-sleep__list__item">
              <button onClick={() => handleSleepTimer(5 * 60)}>
                Shutdown in 5 minutes
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}

export default Clock
