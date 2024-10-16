import { Contact, ExploredItem } from "./types"

interface Message {
  domain: string;
  topic: string
  value: any
}

interface States {
  setContacts: React.Dispatch<React.SetStateAction<Contact[]>>
  setExplorePath: React.Dispatch<React.SetStateAction<string[]>>
  setExploredItems: React.Dispatch<React.SetStateAction<ExploredItem[]>>
}

const serverHandler = (message: Message, states: States) => {
  switch (message.domain) {
    case 'contacts':
      switch(message.topic) {
        case 'get-contacts':
          states.setContacts(message.value)
          break
        case 'create-contact':
          break
        default:
          console.warn('[CONTACTS] Server sent an unknown message, topic', message.topic)
      }
      break

    case 'explorer':
      switch(message.topic) {
        case 'list':
          states.setExploredItems(message.value['items'])
          states.setExplorePath(message.value['pathItems'])
          break
        default:
          console.warn('[EXPLORER] Server sent an unknown message, topic', message.topic)
      }
      break

    case 'phone':
      switch(message.topic) {
        case 'start-call':
          break
        default:
          console.warn('[PHONE] Server sent an unknown message, topic', message.topic)
      }
      break

    default:
      console.warn('Server sent an unknown message, domain', message.domain)
  }
}

export default serverHandler