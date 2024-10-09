

import { DockWindow, Power, ThemeLightDark } from '../../assets/icons'
import { useScreenContext } from '../../context/ScreenContext'
import './Settings.css'


const Settings = () => {

  const { interfaces, toggleDarkMode } = useScreenContext()

  const handlePowerOff = () => {
    interfaces.current.settings.powerOff()
  }

  const handleToggleDisplayOutput = () => {
    alert("Feature not implemented")
  }

  return (
    <div className="settings">
      <div className="settings__row">
        <button
          onClick={toggleDarkMode}
          aria-label='toggle-light-dark-mode'
        >
          <ThemeLightDark />
        </button>
        <p>Toggle dark mode</p>
      </div>
      <div className="settings__row">
        <button
          onClick={handlePowerOff}
          aria-label='power-off'
        >
          <Power />
        </button>
        <p>Power off device</p>
      </div>
      <div className="settings__row">
        <button
          onClick={handleToggleDisplayOutput}
          aria-label='toggle-display'
        >
          <DockWindow />
        </button>
        <p>Toggle display output</p>
      </div>
    </div>
  )
}

export default Settings
