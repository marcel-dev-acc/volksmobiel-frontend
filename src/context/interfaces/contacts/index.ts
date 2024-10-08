export interface Contacts {
  get: () => void
  create: (contact: object) => void
}

const contacts = (socket: WebSocket): Contacts => ({
  get: () => {
    socket.send(JSON.stringify({ domain: 'contacts', topic: 'get-contacts', value: '' }))
  },
  create: (contact: object) => {
    socket.send(JSON.stringify({ domain: 'contacts', topic: 'create-contact', value: contact }))
  }
})

export default contacts