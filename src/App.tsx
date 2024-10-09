import Status from './components/Status/Status';

import {Contacts, Home, Messenger, Phone, Settings, VideoPlayer} from './screens';
import { Screens, useScreenContext } from './context/ScreenContext';

import './App.css'
import { Navigation } from './components';

const App = () => {

  const {screen, darkMode} = useScreenContext()

  return (
    <main className={darkMode}>
      <Status />
      {screen === Screens.welcome && <p>Welcome [not implemented]</p>}
      {screen === Screens.home && <Home />}
      {screen === Screens.phone && <Phone />}
      {screen === Screens.messenger && <Messenger />}
      {screen === Screens.contacts && <Contacts />}
      {screen === Screens.settings && <Settings />}
      {screen === Screens.videoPlayer && <VideoPlayer />}
      {screen !== Screens.home && <Navigation />}
    </main>
  )
}

export default App
