


import { useEffect, useState } from 'react'
import './Phone.css'
import { BackSpaceOutline, PhoneHangUp, Phone as PhoneIcon } from '../../assets/icons'
import { useScreenContext } from '../../context/ScreenContext'
import dayjs from 'dayjs'

const Phone = () => {

  const pad = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    ['*', 0, '#'],
  ]

  const { interfaces } = useScreenContext()

  const [number, setNumber] = useState('0044')
  const [status, setStatus] = useState<'call' | 'hang-up'>('call')
  const [keep, setKeep] = useState(dayjs().unix())
  const [time, setTime] = useState(dayjs().unix())

  const handleClearPress = () => {
    setNumber(prev => prev.slice(0, -1))
  }

  const handleKeyPress = (key: string) => {
    if (number.length >= 14) {
      return
    }
    setNumber(prev => `${prev}${key}`)
  }

  const handleCallPress = () => {
    if (status === 'call') {
      interfaces.current.phone.startCall(number)
      setStatus('hang-up')
    } else {
      interfaces.current.phone.endCall(number)
      setStatus('call')
    }
  }

  useEffect(() => {
    setKeep(dayjs().unix())
    setTime(dayjs().unix())

    if (status === 'hang-up') {
      setInterval(() => {
        setTime(dayjs().unix())
      }, 1000)
    }
  }, [status])

  return (
    <div className="phone">
      <div className="phone__number">
        <h2>{number}</h2>
        {number.length > 0 && <button onClick={handleClearPress}>
          <BackSpaceOutline />
        </button>}
      </div>
      {status === 'hang-up' && (time - keep) > 0 && <div className="phone__timer">
        <p>{`${Math.floor((time - keep) / 60)}:${(time - keep) - Math.floor((time - keep) / 60) * 60 < 10 ? `0${(time - keep) - Math.floor((time - keep) / 60) * 60}` : (time - keep) - Math.floor((time - keep) / 60) * 60}`}</p>
      </div>}
      <div className="phone__pad">
        {pad.map((row, idx) => (
          <div key={idx} className="phone__pad__row">
            {row.map((item, idy) => (
              <button key={idy} className="phone__pad__button" onClick={() => handleKeyPress(item.toString())}>
                {item.toString()}
              </button>
            ))}
          </div>
        ))}
        <div className="phone__pad__row">
          <button
            className={`phone__pad__button phone__pad__call phone__pad__call--${status}`}
            onClick={handleCallPress}
          >
            {status === 'call' && <PhoneIcon />}
            {status === 'hang-up' && <PhoneHangUp />}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Phone
