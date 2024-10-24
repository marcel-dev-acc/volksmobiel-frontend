import type {Contact, ExploredItem, Playlist, UsbDevice} from './types'

interface Message {
  domain: string
  topic: string
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  value: any
}

interface States {
  setContacts: React.Dispatch<React.SetStateAction<Array<Contact>>>
  setExplorePath: React.Dispatch<React.SetStateAction<Array<string>>>
  setExploredItems: React.Dispatch<
    React.SetStateAction<Array<ExploredItem>>
  >
  setUsbDevices: React.Dispatch<React.SetStateAction<Array<UsbDevice>>>
  setPlaylist: React.Dispatch<React.SetStateAction<Playlist>>
}

const serverHandler = (message: Message, states: States): void => {
  switch (message.domain) {
    case 'contacts':
      switch (message.topic) {
        case 'get-contacts':
          states.setContacts(message.value)
          break
        case 'create-contact':
          break
        default:
          console.warn(
            '[CONTACTS] Server sent an unknown message, topic',
            message.topic
          )
      }
      break

    case 'explorer':
      switch (message.topic) {
        case 'list':
          states.setExploredItems(message.value['items'])
          states.setExplorePath(message.value['pathItems'])
          break
        default:
          console.warn(
            '[EXPLORER] Server sent an unknown message, topic',
            message.topic
          )
      }
      break

    case 'phone':
      switch (message.topic) {
        case 'start-call':
          break
        default:
          console.warn(
            '[PHONE] Server sent an unknown message, topic',
            message.topic
          )
      }
      break

    case 'system':
      switch (message.topic) {
        case 'list-usb':
          states.setUsbDevices(message.value)
          break
        default:
          console.warn(
            '[SYSTEM] Server sent an unknown message, topic',
            message.topic
          )
      }
      break

    case 'video':
      switch (message.topic) {
        case 'get-playlist':
          states.setPlaylist(prev => ({
            ...prev,
            video: message.value
          }))
          break
        default:
          console.warn(
            '[VIDEO] Server sent an unknown message, topic',
            message.topic
          )
      }
      break

    default:
      console.warn(
        'Server sent an unknown message, domain',
        message.domain
      )
  }
}

export default serverHandler
