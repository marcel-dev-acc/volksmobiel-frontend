import type {MutableRefObject} from 'react'
import React from 'react'
import {Keyboard, Modal} from '../components'
import type {
  Contact,
  ExploredItem,
  Message,
  Playlist,
  UsbDevice
} from './types'
import axios from 'axios'

interface ModalHandler {
  info: (msg: string) => void
  warn: (msg: string) => void
  error: (msg: string) => void
  close: () => void
}

export interface ScreenContextProps {
  // References
  keyboardMutator: MutableRefObject<
    React.Dispatch<React.SetStateAction<string>> | undefined
  >
  // State
  screen: Screens
  setScreen: React.Dispatch<React.SetStateAction<Screens>>
  darkMode: 'light' | 'dark'
  contacts: Array<Contact>
  setContacts: React.Dispatch<React.SetStateAction<Contact[]>>
  explorePath: Array<string>
  setExplorePath: React.Dispatch<React.SetStateAction<string[]>>
  exploredItems: Array<ExploredItem>
  setExploredItems: React.Dispatch<React.SetStateAction<ExploredItem[]>>
  usbDevices: Array<UsbDevice>
  setUsbDevices: React.Dispatch<React.SetStateAction<UsbDevice[]>>
  playlist: Playlist
  setPlaylist: React.Dispatch<React.SetStateAction<Playlist>>
  sleepIn: number | undefined
  setSleepIn: (time: number | undefined) => void
  systemDetails: Array<string>
  setSystemDetails: React.Dispatch<React.SetStateAction<string[]>>
  hostIp: string
  setHostIp: React.Dispatch<React.SetStateAction<string>>
  copySrc?: Array<string>
  setCopySrc: React.Dispatch<
    React.SetStateAction<Array<string> | undefined>
  >
  messages: Array<Message>
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>
  showKeyboard: boolean
  setShowKeyboard: React.Dispatch<React.SetStateAction<boolean>>
  // Handlers
  modal: ModalHandler
  toggleDarkMode: () => void
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
  const initPolling = React.useRef(false)

  const keyboardMutator = React.useRef()

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
  const [copySrc, setCopySrc] = React.useState<Array<string>>()
  const [messages, setMessages] = React.useState<Array<Message>>([])
  const [showKeyboard, setShowKeyboard] = React.useState(false)

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

  const memoProviderValues = React.useMemo(
    () => ({
      // References
      keyboardMutator,
      // State
      screen,
      setScreen,
      darkMode,
      contacts,
      setContacts,
      explorePath,
      setExplorePath,
      exploredItems,
      setExploredItems,
      usbDevices,
      setUsbDevices,
      playlist,
      setPlaylist,
      sleepIn,
      setSleepIn,
      systemDetails,
      setSystemDetails,
      hostIp,
      setHostIp,
      copySrc,
      setCopySrc,
      messages,
      setMessages,
      showKeyboard,
      setShowKeyboard,
      // Handlers
      modal,
      toggleDarkMode
    }),
    [
      // References
      keyboardMutator,
      // State
      screen,
      setScreen,
      darkMode,
      contacts,
      setContacts,
      explorePath,
      setExplorePath,
      exploredItems,
      setExploredItems,
      usbDevices,
      setUsbDevices,
      playlist,
      setPlaylist,
      sleepIn,
      setSleepIn,
      systemDetails,
      setSystemDetails,
      hostIp,
      setHostIp,
      copySrc,
      setCopySrc,
      messages,
      setMessages,
      showKeyboard,
      setShowKeyboard,
      // Handlers
      modal,
      toggleDarkMode
    ]
  )

  const handleQueuePolling = async (): Promise<void> => {
    const queue = await axios.get('http://0.0.0.0:5000/polling/queue')
    console.log(queue.data)
  }

  React.useEffect(() => {
    if (!initPolling.current) {
      initPolling.current = true
      const phonePollingInterval = setInterval(handleQueuePolling, 500)
      return (): void => {
        clearInterval(phonePollingInterval)
      }
    }
  }, [])

  return (
    <ScreenContext.Provider value={memoProviderValues}>
      {modalState && <Modal state={modalState} msg={modalMsg} />}
      {showKeyboard && <Keyboard />}
      {children}
    </ScreenContext.Provider>
  )
}
