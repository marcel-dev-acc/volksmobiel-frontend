export interface Video {
  play: () => void
}

const video = (socket: WebSocket): Video => ({
  play: () => {
    socket.send(JSON.stringify({ domain: 'video', topic: 'play', value: 'file:////home/marcel/Documents/series/Two and A Half Men/Season 1/Two And A Half Men - 101.avi' }))
  },
})

export default video