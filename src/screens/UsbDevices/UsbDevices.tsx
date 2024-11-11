import React from 'react'

import './UsbDevices.css'
import {useScreenContext} from '../../context/ScreenContext'
import {Minus, Plus, Usb} from '../../assets/icons'

const UsbDevices = (): JSX.Element => {
  const {usbDevices, interfaces} = useScreenContext()

  const initRef = React.useRef(false)

  const handleToggleMount = (
    mounted: boolean,
    device: string,
    deviceUuid: string
  ): void => {
    if (mounted) {
      interfaces.current.settings.unmountUsb(deviceUuid)
    } else {
      interfaces.current.settings.mountUsb(device, deviceUuid)
    }
    interfaces.current.settings.listUsb()
  }

  React.useEffect(() => {
    if (!initRef.current) {
      initRef.current = true
      interfaces.current.settings.listUsb()
    }
  }, [])

  return (
    <div className="usb-devices">
      <h1>Devices</h1>
      <ul className="usb-devices__list">
        {usbDevices.map(usbDevice => (
          <li key={usbDevice.name} className="usb-devices__list__item">
            <button
              onClick={() =>
                handleToggleMount(
                  usbDevice.mounted as unknown as boolean,
                  usbDevice.name,
                  usbDevice.UUID
                )
              }>
              {usbDevice.mounted ? <Minus /> : <Plus />}
              <Usb />
              <p>{usbDevice.name}</p>
              <p>
                {usbDevice.UUID.length > 26
                  ? usbDevice.UUID.substring(0, 26) + '...'
                  : usbDevice.UUID}
              </p>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default UsbDevices
