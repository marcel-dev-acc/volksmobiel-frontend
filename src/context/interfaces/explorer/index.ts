export interface Explorer {
  list: (items: Array<string> | string) => void
}

const explorer = (socket: WebSocket): Explorer => ({
  list: (value: Array<string> | string): void => {
    socket.send(JSON.stringify({domain: 'explorer', topic: 'list', value}))
  }
})

export default explorer
