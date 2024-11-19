export interface Settings {
  powerOff: () => void
  powerOffAfterDelay: (time: number) => void
  reboot: () => void
  listUsb: () => void
  mountUsb: (device: string, deviceUuid: string) => void
  unmountUsb: (deviceUuid: string) => void
  getSystemDetails: () => void
}

const settings = (socket: WebSocket): Settings => ({
  powerOff: (): void => {
    socket.send(
      JSON.stringify({domain: 'system', topic: 'power-off', value: ''})
    )
  },
  powerOffAfterDelay: (time: number): void => {
    socket.send(
      JSON.stringify({domain: 'system', topic: 'power-off-after-delay', value: time.toString()})
    )
  },
  reboot: (): void => {
    socket.send(
      JSON.stringify({domain: 'system', topic: 'reboot', value: ''})
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
  getSystemDetails: (): void => {
    socket.send(
      JSON.stringify({
        domain: 'system',
        topic: 'get-system-details',
        value: ''
      })
    )
  }
})

export default settings
