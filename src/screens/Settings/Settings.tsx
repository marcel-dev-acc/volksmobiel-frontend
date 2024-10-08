

import { Power } from '../../assets/icons'
import { useScreenContext } from '../../context/ScreenContext'
import './Settings.css'


const Settings = () => {

  const { interfaces } = useScreenContext()

  const handlePowerOff = () => {
    interfaces.current.settings.powerOff()
  }

  return (
    <div className="settings">
      <div className="settings__row">
        <div className="settings__col">
          <button
          onClick={handlePowerOff}
            aria-label='phone'
          >
            <Power />
          </button>
        </div>
        <div className="settings__col">

        </div>
        <div className="settings__col">

        </div>
        <div className="settings__col">

        </div>
      </div>
    </div>
  )
}

export default Settings
