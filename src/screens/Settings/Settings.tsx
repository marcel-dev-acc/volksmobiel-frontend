import React from 'react'

import {DockWindow, Power, ThemeLightDark, Usb} from '../../assets/icons'
import {Screens, useScreenContext} from '../../context/ScreenContext'
import './Settings.css'

const Settings = (): JSX.Element => {
  const {interfaces, toggleDarkMode, setScreen} = useScreenContext()

  const handlePowerOff = (): void => {
    interfaces.current.settings.powerOff()
  }

  const handleToggleDisplayOutput = (): void => {
    alert('Feature not implemented')
  }

  const handleSetScreenToUsb = (): void => setScreen(Screens.usbDevices)

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
      label: 'Toggle display output',
      icon: DockWindow,
      action: handleToggleDisplayOutput
    },
    {
      label: 'View USB devices',
      icon: Usb,
      action: handleSetScreenToUsb
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
