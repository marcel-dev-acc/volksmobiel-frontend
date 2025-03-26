import React from 'react'

import './UsbDevices.css'
import {useScreenContext} from '../../context/ScreenContext'
import {Minus, Plus, Usb} from '../../assets/icons'
import useSettings from '../../hooks/settings'

const UsbDevices = (): JSX.Element => {
  const {usbDevices} = useScreenContext()
  const {listUsbDevices, mountUsb, unmountUsb} = useSettings()

  const initRef = React.useRef(false)

  const handleToggleMount = (
    mounted: boolean,
    device: string,
    deviceUuid: string
  ): void => {
    if (mounted) {
      unmountUsb(deviceUuid)
    } else {
      mountUsb(device, deviceUuid)
    }
    listUsbDevices()
  }

  React.useEffect(() => {
    if (!initRef.current) {
      initRef.current = true
      listUsbDevices()
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
