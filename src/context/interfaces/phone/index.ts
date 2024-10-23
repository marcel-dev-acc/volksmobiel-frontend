export interface Phone {
  startCall: (number: string) => void
  endCall: (number: string) => void
}

const phone = (socket: WebSocket): Phone => ({
  startCall: (number: string): void => {
    socket.send(
      JSON.stringify({domain: 'phone', topic: 'start-call', value: number})
    )
  },
  endCall: (number: string): void => {
    socket.send(
      JSON.stringify({domain: 'phone', topic: 'end-call', value: number})
    )
  }
})

export default phone
