import React from 'react'

import './Status.css'
import {
  BedClock
  // SignalCellular1,
  // SignalCellular2,
  // SignalCellular3,
  // SignalCellularNone
} from '../../assets/icons'
import dayjs from 'dayjs'

// enum SignalCellular {
//   none,
//   one,
//   two,
//   three
// }

interface StatusProps {
  sleepIn?: number
  hostIp: string
}

const Status = ({sleepIn, hostIp}: StatusProps): JSX.Element => {
  const sleepInCountRef = React.useRef(0)

  // const [battery, setBattery] = useState(100)
  // const [signalCellular, setSignalCellular] = useState(SignalCellular.none)
  const [time, setTime] = React.useState(dayjs().unix())
  const [sleepInCount, setSleepInCount] = React.useState(0)

  React.useEffect(() => {
    setInterval(() => {
      setTime(dayjs().unix())
    }, 2500)
  }, [])

  React.useEffect(() => {
    if (sleepIn !== undefined) {
      sleepInCountRef.current = sleepIn
      setSleepInCount(sleepIn)
      setInterval(() => {
        if (sleepInCountRef.current > 0) {
          sleepInCountRef.current = sleepInCountRef.current - 1
          setSleepInCount(sleepInCountRef.current)
        }
      }, 1000)
    }
  }, [sleepIn])

  return (
    <div className="status">
      <div className="status__col">
        <div className="status__time">
          <span>{dayjs.unix(time).format('HH:mm ddd, DD MMM')}</span>
        </div>
      </div>
      <div className="status__col status__centre">
        <p>{hostIp}</p>
      </div>
      <div className="status__col">
        {/* <div className="status__signal-cellular">
          {signalCellular === SignalCellular.none && (
            <SignalCellularNone />
          )}
          {signalCellular === SignalCellular.one && <SignalCellular1 />}
          {signalCellular === SignalCellular.two && <SignalCellular2 />}
          {signalCellular === SignalCellular.three && <SignalCellular3 />}
        </div> */}
        {/* <div className="status__battery">
          <span>{battery}%</span>
        </div> */}
        {sleepIn !== undefined && sleepInCount > 0 && (
          <div className="status__sleep-in">
            <BedClock />
            <p style={{margin: '0', padding: '0', marginLeft: '0.25rem'}}>
              {Math.floor(sleepInCount / 60)}m{' '}
              {sleepInCount - Math.floor(sleepInCount / 60) * 60}s
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Status
