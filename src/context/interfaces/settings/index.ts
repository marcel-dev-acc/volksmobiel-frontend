export interface Settings {
  powerOff: () => void
  listUsb: () => void
  mountUsb: (device: string, deviceUuid: string) => void
  unmountUsb: (deviceUuid: string) => void
  getHostname: () => void
}

const settings = (socket: WebSocket): Settings => ({
  powerOff: (): void => {
    socket.send(
      JSON.stringify({domain: 'system', topic: 'power-off', value: ''})
    )
  },
  listUsb: (): void => {
    socket.send(
      JSON.stringify({
        domain: 'system',
        topic: 'list-usb',
        value: ''
      })
    )
  },
  mountUsb: (
    device: string,
    deviceUuid: string
  ): void => {
    socket.send(
      JSON.stringify({
        domain: 'system',
        topic: 'mount-usb',
        value: {device, deviceUuid}
      })
    )
  },
  unmountUsb: (deviceUuid: string): void => {
    socket.send(
      JSON.stringify({
        domain: 'system',
        topic: 'unmount-usb',
        value: {deviceUuid}
      })
    )
  },
  getHostname: (): void => {
    socket.send(
      JSON.stringify({
        domain: 'system',
        topic: 'get-hostname',
        value: ''
      })
    )
  }
})

export default settings
