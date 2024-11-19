import type {MutableRefObject} from 'react'
import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState
} from 'react'
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
}

export const ScreenContext = createContext<ScreenContextProps | undefined>(
  undefined
)

export const useScreenContext = (): ScreenContextProps => {
  const context = useContext(ScreenContext)

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
  const socket = useRef(new WebSocket('ws://localhost:8081'))
  const interfaces = useRef(interfacesFn(socket.current))

  const [screen, setScreen] = useState(Screens.home)
  const [darkMode, setDarkMode] = useState<'light' | 'dark'>('dark')
  const [modalState, setModalState] = useState<
    'info' | 'warn' | 'error' | undefined
  >()
  const [modalMsg, setModalMsg] = useState('')
  const [contacts, setContacts] = useState<Array<Contact>>([])
  const [explorePath, setExplorePath] = useState<Array<string>>([])
  const [exploredItems, setExploredItems] = useState<Array<ExploredItem>>(
    []
  )
  const [usbDevices, setUsbDevices] = useState<Array<UsbDevice>>([])
  const [playlist, setPlaylist] = useState<Playlist>({
    music: [],
    video: []
  })
  const [sleepIn, setSleepIn] = useState<number | undefined>()
  const [systemDetails, setSystemDetails] = useState<Array<string>>([])

  const modal = useMemo(
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

  const toggleDarkMode = useCallback((): void => {
    setDarkMode(darkMode === 'light' ? 'dark' : 'light')
  }, [darkMode])

  const memoProviderValues = useMemo(
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
      systemDetails
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
      systemDetails
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
        setSystemDetails
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
