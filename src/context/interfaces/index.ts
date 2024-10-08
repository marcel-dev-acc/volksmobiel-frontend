import contacts, { type Contacts } from "./contacts"
import phone, { type Phone } from "./phone"
import settings, { type Settings } from "./settings"

export interface Interfaces {
  socket: WebSocket
  phone: Phone
  contacts: Contacts
  settings: Settings
}

const interfaces = (socket: WebSocket): Interfaces => ({
  socket,
  phone: phone(socket),
  contacts: contacts(socket),
  settings: settings(socket),
})

export default interfaces