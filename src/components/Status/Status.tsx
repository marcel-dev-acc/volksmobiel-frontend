import { useEffect, useState } from 'react'



import './Status.css'
import { SignalCellular1, SignalCellular2, SignalCellular3, SignalCellularNone } from '../../assets/icons'
import dayjs from 'dayjs'

enum SignalCellular {
  none,
  one,
  two,
  three
}

const Status = () => {

  const [battery, setBattery] = useState(100)
  const [signalCellular, setSignalCellular] = useState(SignalCellular.none)
  const [time, setTime] = useState(dayjs().unix())

  useEffect(() => {
    setInterval(() => {
      setTime(dayjs().unix())
    }, 2500)
  }, [])

  return (
    <div className="status">
      <div className="status__col">
        <div className="status__time">
          <span>{dayjs.unix(time).format('HH:mm ddd, DD MMM')}</span>
        </div>
      </div>
      <div className="status__col">
        <div className="status__signal-cellular">
          {signalCellular === SignalCellular.none && <SignalCellularNone />}
          {signalCellular === SignalCellular.one && <SignalCellular1 />}
          {signalCellular === SignalCellular.two && <SignalCellular2 />}
          {signalCellular === SignalCellular.three && <SignalCellular3 />}
        </div>
        {/* <div className="status__battery">
          <span>{battery}%</span>
        </div> */}
      </div>
    </div>
  )
}

export default Status
