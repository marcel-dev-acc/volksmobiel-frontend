import contacts, { type Contacts } from './contacts';
import type { Explorer } from './explorer';
import explorer from './explorer';
import phone, { type Phone } from './phone';
import settings, { type Settings } from './settings';
import type { Video } from './video';
import video from './video';

export interface Interfaces {
  socket: WebSocket;
  phone: Phone;
  contacts: Contacts;
  settings: Settings;
  video: Video;
  explorer: Explorer;
}

const interfaces = (socket: WebSocket): Interfaces => ({
  socket,
  phone: phone(socket),
  contacts: contacts(socket),
  settings: settings(socket),
  video: video(socket),
  explorer: explorer(socket),
});

export default interfaces;
