export interface Explorer {
  list: (items: Array<string>) => void
}

const explorer = (socket: WebSocket): Explorer => ({
  list: (items: Array<string>) => {
    socket.send(JSON.stringify({ domain: 'explorer', topic: 'list', value: items }))
  },
})

export default explorer