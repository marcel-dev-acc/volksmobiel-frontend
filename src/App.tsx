import Status from './components/Status/Status';

import {Contacts, Home, Messenger, Phone, Settings, VideoPlayer, Explorer, UsbDevices, Clock} from './screens';
import { Screens, useScreenContext } from './context/ScreenContext';

import './App.css'
import { Navigation } from './components';
import { useState } from 'react';

const App = () => {

  const {screen, darkMode, sleepIn} = useScreenContext()

  const [activeVideo, setActiveVideo] = useState<Array<string> | undefined>()

  return (
    <main className={darkMode}>
      <Status sleepIn={sleepIn} />
      {screen === Screens.welcome && <p>Welcome [not implemented]</p>}
      {screen === Screens.home && <Home />}
      {screen === Screens.phone && <Phone />}
      {screen === Screens.messenger && <Messenger />}
      {screen === Screens.contacts && <Contacts />}
      {screen === Screens.settings && <Settings />}
      {screen === Screens.videoPlayer && <VideoPlayer activeVideo={activeVideo} />}
      {screen === Screens.explorer && <Explorer setActiveVideo={setActiveVideo} />}
      {screen === Screens.usbDevices && <UsbDevices />}
      {screen === Screens.clock && <Clock />}

      {screen !== Screens.home && <Navigation />}
    </main>
  )
}

export default App
