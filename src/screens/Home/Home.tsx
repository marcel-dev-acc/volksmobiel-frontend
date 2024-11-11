import React from 'react'
import {
  // Account,
  // Chat,
  ClockOutline,
  Cog,
  FolderOpenOutline,
  // MusicCircleOutline,
  // MusicClefTreble,
  // Phone,
  // Snake,
  VideoBox
} from '../../assets/icons'
import {Screens, useScreenContext} from '../../context/ScreenContext'
import './Home.css'

interface App {
  id: string
  icon?: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {title?: string}
  >
  click?: () => void
}

const Home = (): JSX.Element => {
  const {setScreen, darkMode} = useScreenContext()

  const apps: App[][] = [
    [
      // {
      //   id: 'b6596337-6481-4a79-9644-7027bd00b008',
      //   icon: Phone,
      //   click: () => setScreen(Screens.phone)
      // },
      // {
      //   id: 'a2685411-5c21-4019-ac71-c9ebf744ac0d',
      //   icon: Chat,
      //   click: () => setScreen(Screens.messenger)
      // },
      // {
      //   id: 'd4c13908-f8f5-4c7e-851a-705b1e3a76a1',
      //   icon: Account,
      //   click: () => setScreen(Screens.contacts)
      // },
      // {
      //   id: '6796c35a-edfe-4989-9a3c-b40f439147ae',
      //   icon: FolderOpenOutline,
      //   click: () => setScreen(Screens.explorer)
      // }
    ],
    [
      {
        id: '6796c35a-edfe-4989-9a3c-b40f439147ae',
        icon: FolderOpenOutline,
        click: () => setScreen(Screens.explorer)
      },
      // {
      //   id: 'c7a14894-21e5-4257-9196-80c9b81b751d',
      //   icon: MusicCircleOutline,
      //   click: () => setScreen(Screens.messenger)
      // },
      {
        id: '3078cd19-1c07-4cd0-b8f4-8dada1ef288a',
        icon: VideoBox,
        click: () => setScreen(Screens.videoPlayer)
      },
      {
        id: 'ad1c1b9d-f47f-48d7-8659-a2453ffb4a77',
        icon: ClockOutline,
        click: () => setScreen(Screens.clock)
      },
      {
        id: 'baedb4ac-61c0-4d9f-a696-0fd3b1282be0',
        icon: Cog,
        click: () => setScreen(Screens.settings)
      }
    ],
    [
      // {
      //   id: '2e8eea4c-babf-4922-aa6e-ed8ac5803604',
      //   icon: undefined,
      //   click: undefined
      // },
      // {
      //   id: 'c1c9620f-b9da-4478-a955-ae94174bc183',
      //   icon: Snake,
      //   click: () => setScreen(Screens.messenger)
      // },
      // {
      //   id: 'ecc4fb15-4e84-415b-8b20-9bd2b6707dea',
      //   icon: MusicClefTreble,
      //   click: () => setScreen(Screens.guessThatSong)
      // },
      // {
      //   id: 'b92cf6fe-cc46-40b0-86ab-fafa29c161dd',
      //   icon: undefined,
      //   click: undefined
      // }
    ]
  ]

  return (
    <div className="home">
      <img
        className="home__background"
        src="/assets/images/system/jeremy-bishop-EwKXn5CapA4-unsplash.jpg"
        alt="home-background"
      />
      {apps.map((row, idx) => (
        <div key={idx} className="home__row">
          {row.map(app => {
            const Icon = app.icon
            return (
              <div
                key={app.id}
                className={['home__col', `home__col--${darkMode}`].join(
                  ' '
                )}>
                {Icon && (
                  <button onClick={app.click}>
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
