import { Contact } from "./types"

interface Message {
  topic: string
  value: any
}

interface States {
  setContacts: React.Dispatch<React.SetStateAction<Contact[]>>
}

const serverHandler = (message: Message, states: States) => {
  switch(message.topic) {
    case 'start-call':
      break
    case 'get-contacts':
      states.setContacts(message.value)
      break
    case 'create-contact':
      break
    default:
      console.warn('Server sent an unknown message, topic', message.topic)
  }
}

export default serverHandler