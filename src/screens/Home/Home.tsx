
import { Account, Chat, Cog, FolderOpenOutline, MusicCircleOutline, MusicClefTreble, Phone, Snake, VideoBox } from '../../assets/icons'
import { Screens, useScreenContext } from '../../context/ScreenContext'
import './Home.css'

interface App {
  icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement> & { title?: string; }>
  click?: () => void
} 

const Home = () => {

  const apps: App[][] = [
    [
      { icon: Phone, click: () => setScreen(Screens.phone) },
      { icon: Chat, click: () => setScreen(Screens.messenger) },
      { icon: Account, click: () => setScreen(Screens.contacts) },
      { icon: FolderOpenOutline, click: () => setScreen(Screens.messenger) },
    ],
    [
      { icon: MusicCircleOutline, click: () => setScreen(Screens.messenger) },
      { icon: VideoBox, click: () => setScreen(Screens.messenger) },
      { icon: undefined, click: undefined },
      { icon: Cog, click: () => setScreen(Screens.settings) },
    ],
    [
      { icon: undefined, click: undefined },
      { icon: Snake, click: () => setScreen(Screens.messenger) },
      { icon: MusicClefTreble, click: () => setScreen(Screens.messenger) },
      { icon: undefined, click: undefined },
    ],
  ]

  const {setScreen} = useScreenContext()

  return (
    <div className="home">
      {apps.map(row => (
        <div className="home__row">
          {row.map(app => {
            const Icon = app.icon
            return (
              <div className="home__col">
                {Icon && (
                  <button
                    onClick={app.click}
                    aria-label='phone'
                  >
                    <Icon />
                  </button>
                )}
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}

export default Home
