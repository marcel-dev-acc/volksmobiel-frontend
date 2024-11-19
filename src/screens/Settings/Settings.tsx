import React from 'react'

import {
  CardAccountDetailsOutline,
  DockWindow,
  Power,
  Restart,
  ThemeLightDark,
  Usb
} from '../../assets/icons'
import {Screens, useScreenContext} from '../../context/ScreenContext'
import './Settings.css'

const Settings = (): JSX.Element => {
  const {interfaces, toggleDarkMode, setScreen} = useScreenContext()

  const handlePowerOff = (): void => {
    interfaces.current.settings.powerOff()
  }

  const handleReboot = (): void => {
    interfaces.current.settings.reboot()
  }

  const handleToggleDisplayOutput = (): void => {
    alert('Feature not implemented')
  }

  const handleSetScreenToUsb = (): void => setScreen(Screens.usbDevices)
  const handleSetScreenToSystemDetails = (): void =>
    setScreen(Screens.systemDetails)

  const utilities = [
    {
      label: 'Toggle dark mode',
      icon: ThemeLightDark,
      action: toggleDarkMode
    },
    {
      label: 'Power off device',
      icon: Power,
      action: handlePowerOff
    },
    {
      label: 'Reboot device',
      icon: Restart,
      action: handleReboot
    },
    {
      label: 'Toggle display output',
      icon: DockWindow,
      action: handleToggleDisplayOutput
    },
    {
      label: 'View USB devices',
      icon: Usb,
      action: handleSetScreenToUsb
    },
    {
      label: 'System details',
      icon: CardAccountDetailsOutline,
      action: handleSetScreenToSystemDetails
    }
  ]

  return (
    <div className="settings">
      {utilities.map(utility => (
        <div key={utility.label} className="settings__row">
          <button onClick={utility.action} aria-label={utility.label}>
            <utility.icon />
          </button>
          <p>{utility.label}</p>
        </div>
      ))}
    </div>
  )
}

export default Settings
