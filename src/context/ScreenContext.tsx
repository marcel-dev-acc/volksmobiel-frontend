import type {MutableRefObject} from 'react'
import React from 'react'
import {Modal} from '../components'
import interfacesFn, {type Interfaces} from './interfaces'
import type {
  Contact,
  ExploredItem,
  Playlist,
  UsbDevice
} from './interfaces/types'
import serverHandler from './interfaces/server-handler'

interface ModalHandler {
  info: (msg: string) => void
  warn: (msg: string) => void
  error: (msg: string) => void
  close: () => void
}

export interface ScreenContextProps {
  screen: Screens
  setScreen: (screen: Screens) => void
  darkMode: 'light' | 'dark'
  toggleDarkMode: () => void
  modal: ModalHandler
  interfaces: MutableRefObject<Interfaces>
  contacts: Array<Contact>
  explorePath: Array<string>
  exploredItems: Array<ExploredItem>
  usbDevices: Array<UsbDevice>
  sleepIn: number | undefined
  setSleepIn: (time: number | undefined) => void
  playlist: Playlist
  systemDetails: Array<string>
  hostIp: string
}

export const ScreenContext = React.createContext<
  ScreenContextProps | undefined
>(undefined)

export const useScreenContext = (): ScreenContextProps => {
  const context = React.useContext(ScreenContext)

  if (context === undefined) {
    throw new Error(
      'useScreenContext must be used within a ScreenProvider'
    )
  }

  return context
}

export enum Screens {
  welcome,
  home,
  phone,
  messenger,
  contacts,
  settings,
  videoPlayer,
  explorer,
  usbDevices,
  clock,
  guessThatSong,
  systemDetails
}

export const ScreenProvider = ({
  children
}: React.PropsWithChildren): JSX.Element => {
  const socket = React.useRef(
    new WebSocket(`ws://${window.location.hostname}:8081`)
  )
  const interfaces = React.useRef(interfacesFn(socket.current))

  const [screen, setScreen] = React.useState(Screens.home)
  const [darkMode, setDarkMode] = React.useState<'light' | 'dark'>('dark')
  const [modalState, setModalState] = React.useState<
    'info' | 'warn' | 'error' | undefined
  >()
  const [modalMsg, setModalMsg] = React.useState('')
  const [contacts, setContacts] = React.useState<Array<Contact>>([])
  const [explorePath, setExplorePath] = React.useState<Array<string>>([])
  const [exploredItems, setExploredItems] = React.useState<
    Array<ExploredItem>
  >([])
  const [usbDevices, setUsbDevices] = React.useState<Array<UsbDevice>>([])
  const [playlist, setPlaylist] = React.useState<Playlist>({
    music: [],
    video: []
  })
  const [sleepIn, setSleepIn] = React.useState<number | undefined>()
  const [systemDetails, setSystemDetails] = React.useState<Array<string>>(
    []
  )
  const [hostIp, setHostIp] = React.useState('')

  const modal = React.useMemo(
    () => ({
      info: (msg: string): void => {
        setModalState('info')
        setModalMsg(msg)
      },
      warn: (msg: string): void => {
        setModalState('warn')
        setModalMsg(msg)
      },
      error: (msg: string): void => {
        setModalState('error')
        setModalMsg(msg)
      },
      close: (): void => {
        setModalState(undefined)
        setModalMsg('')
      }
    }),
    []
  )

  const toggleDarkMode = React.useCallback((): void => {
    setDarkMode(darkMode === 'light' ? 'dark' : 'light')
  }, [darkMode])

  socket.current.addEventListener('open', () => {
    interfaces.current.settings.getHostIp()
  })

  const memoProviderValues = React.useMemo(
    () => ({
      screen,
      setScreen,
      darkMode,
      toggleDarkMode,
      modal,
      interfaces,
      contacts,
      explorePath,
      exploredItems,
      usbDevices,
      sleepIn,
      setSleepIn,
      playlist,
      systemDetails,
      hostIp
    }),
    [
      screen,
      setScreen,
      darkMode,
      toggleDarkMode,
      modal,
      interfaces,
      contacts,
      explorePath,
      exploredItems,
      usbDevices,
      sleepIn,
      setSleepIn,
      playlist,
      systemDetails,
      hostIp
    ]
  )

  socket.current.addEventListener('message', event => {
    try {
      serverHandler(JSON.parse(event.data), {
        setContacts,
        setExplorePath,
        setExploredItems,
        setUsbDevices,
        setPlaylist,
        setSystemDetails,
        setHostIp
      })
    } catch {
      console.error('Message from server ', event.data)
    }
  })

  return (
    <ScreenContext.Provider value={memoProviderValues}>
      {modalState && <Modal state={modalState} msg={modalMsg} />}
      {children}
    </ScreenContext.Provider>
  )
}
