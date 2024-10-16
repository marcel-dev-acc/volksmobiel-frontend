

import './UsbDevices.css'
import { useScreenContext } from '../../context/ScreenContext'
import { Minus, Plus, Usb } from '../../assets/icons'
import { useState } from 'react'


const UsbDevices = () => {

  const { usbDevices, interfaces } = useScreenContext()

  const [password, setPassword] = useState('')

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)

  const handleSubmit = () => {
    if (!password) {
      return
    }
    interfaces.current.settings.listUsb(password)
  }

  const handleToggleMount = (mounted: boolean, device: string, deviceUuid: string) => {
    if (!password) {
      return
    }
    if (mounted) {
      interfaces.current.settings.unmountUsb(password, deviceUuid)
    } else {
      interfaces.current.settings.mountUsb(password, device, deviceUuid)
    }
    interfaces.current.settings.listUsb(password)
  }

  return (
    <div className="usb-devices">
      <h1>Devices</h1>
      <form action='#'>
        <label className='usb-devices__form__label'>
          System password
          <input
            id='password'
            type="password"
            required
            value={password}
            onChange={handlePasswordChange}
            placeholder='System password'
            className='usb-devices__form__input'
          />
        </label>
        <button
          className='usb-devices__form__button--primary'
          onClick={handleSubmit}
        >
          List devices
        </button>
      </form>
      <ul className='usb-devices__list'>
        {usbDevices.map(usbDevice => (
          <li key={usbDevice.name} className='usb-devices__list__item'>
            <button
              onClick={() => handleToggleMount(usbDevice.mounted as unknown as boolean, usbDevice.name, usbDevice.UUID)}
            >
              {usbDevice.mounted ? <Minus /> : <Plus />}
              <Usb />
              <span>{usbDevice.name}</span>
              <span>{usbDevice.UUID.length > 26 ? usbDevice.UUID.substring(0, 26) + '...' : usbDevice.UUID}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default UsbDevices
