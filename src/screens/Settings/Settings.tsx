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
import useSettings from '../../hooks/settings'

const Settings = (): JSX.Element => {
  const {toggleDarkMode, setScreen} = useScreenContext()
  const {shutdown, restart} = useSettings()

  const handlePowerOff = (): void => {
    shutdown()
  }

  const handleReboot = (): void => {
    restart()
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
    },
    {
      label: 'Reload app',
      icon: Restart,
      action: (): void => window.location.reload()
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
