export interface Video {
  play: (filePathArray: Array<string>) => void
  autoPlay: (filePathArray: Array<string>) => void
  playPlaylist: () => void
  getPlaylist: () => void
  addToPlaylist: (name: string, filePathArray: Array<string>) => void
  removeFromPlaylist: (id: string) => void
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
  },
  autoPlay: (filePathArray: Array<string>): void => {
    socket.send(
      JSON.stringify({
        domain: 'video',
        topic: 'auto-play',
        value: 'file:////' + filePathArray.join('/')
      })
    )
  },
  playPlaylist: (): void => {
    socket.send(
      JSON.stringify({
        domain: 'video',
        topic: 'play-playlist',
        value: ''
      })
    )
  },
  getPlaylist: (): void => {
    socket.send(
      JSON.stringify({
        domain: 'video',
        topic: 'get-playlist',
        value: ''
      })
    )
  },
  addToPlaylist: (name: string, filePathArray: Array<string>): void => {
    socket.send(
      JSON.stringify({
        domain: 'video',
        topic: 'add-to-playlist',
        value: {
          name,
          path: 'file:////' + filePathArray.join('/')
        }
      })
    )
  },
  removeFromPlaylist: (value: string): void => {
    socket.send(
      JSON.stringify({
        domain: 'video',
        topic: 'remove-from-playlist',
        value
      })
    )
  }
})

export default video
