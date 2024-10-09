import contacts, { type Contacts } from "./contacts"
import phone, { type Phone } from "./phone"
import settings, { type Settings } from "./settings"
import video, { Video } from "./video"

export interface Interfaces {
  socket: WebSocket
  phone: Phone
  contacts: Contacts
  settings: Settings
  video: Video
}

const interfaces = (socket: WebSocket): Interfaces => ({
  socket,
  phone: phone(socket),
  contacts: contacts(socket),
  settings: settings(socket),
  video: video(socket)
})

export default interfaces