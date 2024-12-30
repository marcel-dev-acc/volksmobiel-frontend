export interface Messages {
  list: () => void
}

const messages = (socket: WebSocket): Messages => ({
  list: (): void => {
    socket.send(JSON.stringify({domain: 'messages', topic: 'list', value: ''}))
  }
})

export default messages
