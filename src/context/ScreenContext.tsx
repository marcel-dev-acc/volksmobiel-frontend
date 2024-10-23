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
import type {Contact, ExploredItem, UsbDevice} from './interfaces/types'
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
  handleSleepTimer: (timeRemaining?: number) => void
  sleepIn: number | undefined
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
  clock
}

export const ScreenProvider = ({
  children
}: React.PropsWithChildren): JSX.Element => {
  const socket = useRef(new WebSocket('ws://localhost:8081'))
  const interfaces = useRef(interfacesFn(socket.current))

  const sleepInRef = useRef<number | undefined>()

  const [screen, setScreen] = useState(Screens.home)
  const [darkMode, setDarkMode] = useState<'light' | 'dark'>('light')
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
  const [sleepIn, setSleepIn] = useState<number | undefined>()

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

  /**
   * handleSleepTime
   * Tracks the amount of time remaining before the devices
   * shuts down.
   */
  const handleSleepTimer = useCallback((timeRemaining?: number) => {
    if (timeRemaining === undefined) {
      sleepInRef.current = undefined
      setSleepIn(undefined)
      return
    }
    if (!sleepInRef.current) {
      sleepInRef.current = timeRemaining
    }
    if (sleepInRef.current === 0) {
      console.log('Timer finished')
      sleepInRef.current = undefined
      return
    }
    console.log('Time remaining', sleepInRef.current)
    sleepInRef.current = sleepInRef.current - 1
    setSleepIn(sleepInRef.current)
    setTimeout(() => {
      if (sleepInRef.current) {
        handleSleepTimer(-1)
      }
    }, 1000)
  }, [])

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
      handleSleepTimer,
      sleepIn
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
      handleSleepTimer,
      sleepIn
    ]
  )

  socket.current.addEventListener('message', event => {
    try {
      serverHandler(JSON.parse(event.data), {
        setContacts,
        setExplorePath,
        setExploredItems,
        setUsbDevices
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
