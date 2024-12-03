import type {Contact, ExploredItem, Playlist, UsbDevice} from './types'

interface Value {
  [key: string]: unknown
}
interface Message {
  domain: string
  topic: string
  value: unknown
}

interface States {
  setContacts: React.Dispatch<React.SetStateAction<Array<Contact>>>
  setExplorePath: React.Dispatch<React.SetStateAction<Array<string>>>
  setExploredItems: React.Dispatch<
    React.SetStateAction<Array<ExploredItem>>
  >
  setUsbDevices: React.Dispatch<React.SetStateAction<Array<UsbDevice>>>
  setPlaylist: React.Dispatch<React.SetStateAction<Playlist>>
  setSystemDetails: React.Dispatch<React.SetStateAction<Array<string>>>
  setHostIp: React.Dispatch<React.SetStateAction<string>>
}

const serverHandler = (message: Message, states: States): void => {
  switch (message.domain) {
    case 'contacts':
      switch (message.topic) {
        case 'get-contacts':
          states.setContacts(message.value as Array<Contact>)
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
          states.setExploredItems(
            (message.value as Value)['items'] as Array<ExploredItem>
          )
          states.setExplorePath(
            (message.value as Value)['pathItems'] as Array<string>
          )
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
          states.setUsbDevices(message.value as Array<UsbDevice>)
          break
        case 'get-system-details':
          states.setSystemDetails(message.value as Array<string>)
          break
        case 'get-host-ip':
          states.setHostIp(message.value as string)
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
            video: message.value as Playlist['video']
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
