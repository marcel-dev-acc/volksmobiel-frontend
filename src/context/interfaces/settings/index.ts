export interface Settings {
  powerOff: () => void
}

const settings = (socket: WebSocket): Settings => ({
  powerOff: () => {
    socket.send(JSON.stringify({ domain: 'system', topic: 'power-off', value: '' }))
  },
})

export default settings