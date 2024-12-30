import React from 'react'

import Status from './components/Status/Status'

import {
  Clock,
  Contacts,
  Explorer,
  GuessThatSong,
  Home,
  Messenger,
  Phone,
  Settings,
  SystemDetails,
  UsbDevices,
  Video
} from './screens'
import {Screens, useScreenContext} from './context/ScreenContext'

import './App.css'
import {Navigation} from './components'
import {handleKeyPress} from './utils/navigation'

const App = (): JSX.Element => {
  const {screen, darkMode, sleepIn, hostIp, copySrc, setCopySrc} =
    useScreenContext()

  const [activeVideo, setActiveVideo] = React.useState<
    Array<string> | undefined
  >()

  React.useEffect(() => {
    window.addEventListener('keydown', handleKeyPress)
    return (): void => {
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [])

  return (
    <main className={darkMode}>
      <Status
        copySrc={copySrc}
        setCopySrc={setCopySrc}
        sleepIn={sleepIn}
        hostIp={hostIp}
      />
      {screen === Screens.welcome && <p>Welcome [not implemented]</p>}
      {screen === Screens.home && <Home />}
      {screen === Screens.phone && <Phone />}
      {screen === Screens.messenger && <Messenger />}
      {screen === Screens.contacts && <Contacts />}
      {screen === Screens.settings && <Settings />}
      {screen === Screens.videoPlayer && (
        <Video activeVideo={activeVideo} setActiveVideo={setActiveVideo} />
      )}
      {screen === Screens.explorer && (
        <Explorer setActiveVideo={setActiveVideo} />
      )}
      {screen === Screens.usbDevices && <UsbDevices />}
      {screen === Screens.clock && <Clock />}
      {screen === Screens.guessThatSong && <GuessThatSong />}
      {screen === Screens.systemDetails && <SystemDetails />}

      {screen !== Screens.home && <Navigation />}
    </main>
  )
}

export default App
