export interface Video {
  play: (filePathArray: Array<string>) => void
}

const video = (socket: WebSocket): Video => ({
  play: (filePathArray: Array<string>): void => {
    socket.send(
      JSON.stringify({
        domain: 'video',
        topic: 'play',
        value: 'file:////' + filePathArray.join('/')
      })
    )
  }
})

export default video
