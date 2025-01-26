import contacts, {type Contacts} from './contacts'
import explorer, {type Explorer} from './explorer'
import phone, {type Phone} from './phone'
import settings, {type Settings} from './settings'
import video, {type Video} from './video'
import messages, {type Messages} from './messages'

export interface Interfaces {
  socket: WebSocket
  phone: Phone
  contacts: Contacts
  settings: Settings
  video: Video
  explorer: Explorer
  messages: Messages
}

const interfaces = (socket: WebSocket): Interfaces => ({
  socket,
  phone: phone(socket),
  contacts: contacts(socket),
  settings: settings(socket),
  video: video(socket),
  explorer: explorer(socket),
  messages: messages(socket)
})

export default interfaces
