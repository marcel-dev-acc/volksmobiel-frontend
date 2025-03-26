import React from 'react'

import './SystemDetails.css'
import {useScreenContext} from '../../context/ScreenContext'
import {
  ArrowDownBoldCircleOutline,
  ArrowUpBoldCircleOutline
} from '../../assets/icons'
import useSettings from '../../hooks/settings'

const SystemDetails = (): JSX.Element => {
  const {systemDetails, darkMode} = useScreenContext()
  const {listHostnameDetails, listNetworkInterfaces} = useSettings()

  const visibleItems = 8

  const initRef = React.useRef(false)

  const [listIndex, setListIndex] = React.useState(0)

  const handleListUp = (): void => {
    if (listIndex <= 0) {
      return
    }
    setListIndex(listIndex - 1)
  }

  const handleListDown = (): void => {
    if (listIndex + visibleItems >= systemDetails.length) {
      return
    }
    setListIndex(listIndex + 1)
  }

  React.useEffect(() => {
    if (!initRef.current) {
      initRef.current = true
      listHostnameDetails()
      listNetworkInterfaces()
    }
  }, [])

  return (
    <div className="system-details">
      <div className="system-details__navigation">
        <button
          className="system-details__navigation-btn"
          onClick={handleListUp}>
          <ArrowUpBoldCircleOutline />
        </button>
      </div>
      {listIndex + visibleItems > visibleItems && (
        <i
          className={`system-details__list__hint system-details__list__hint--${darkMode}`}>
          Scroll up to see more...
        </i>
      )}
      <ul className="system-details__list">
        {systemDetails
          .filter(
            (_, index) =>
              index >= listIndex && index < listIndex + visibleItems
          )
          .map((detail, idx) => (
            <li key={idx} className="system-details__list__item">
              {detail.substring(0, 35)}
            </li>
          ))}
      </ul>
      {listIndex + visibleItems < systemDetails.length && (
        <i
          className={`system-details__list__hint system-details__list__hint--${darkMode}`}>
          Scroll down to see more...
        </i>
      )}
      <div className="system-details__navigation">
        <button
          className="system-details__navigation-btn"
          onClick={handleListDown}>
          <ArrowDownBoldCircleOutline />
        </button>
      </div>
    </div>
  )
}

export default SystemDetails
