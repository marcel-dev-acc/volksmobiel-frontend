export interface Contact {
  id: string
  mobile: string
  email: string
  firstName: string
  lastName: string
}

export interface ExploredItem {
  name: string
  type: string | null
  isFolder: boolean
}

export interface UsbDevice {
  [key: string]: string
}

export interface Playlist {
  music: Array<unknown>
  video: Array<{
    id: string
    name: string
    path: string
  }>
}

export interface Message {
  id: string
  foreignName: string
  messages: Array<{
    id: string
    user: 'owner' | 'foreign'
    text: string
    time: number
  }>
}