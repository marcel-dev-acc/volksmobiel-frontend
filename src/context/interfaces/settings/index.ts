interface CopyFileToDetails {
  filePath: Array<string>
  destination: Array<string>
}

interface CopyFolderContentsToDetails {
  folderPath: Array<string>
  destination: Array<string>
}

export interface Settings {
  powerOff: () => void
  powerOffAfterDelay: (time: number) => void
  reboot: () => void
  listUsb: () => void
  mountUsb: (device: string, deviceUuid: string) => void
  unmountUsb: (deviceUuid: string) => void
  getSystemDetails: () => void
  getHostIp: () => void
  copyFileTo: (details: CopyFileToDetails) => void
  copyFolderContentsTo: (details: CopyFolderContentsToDetails) => void
  removeFolderContents: (path: Array<string>) => void
  removeFolder: (path: Array<string>) => void
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
  },
  getHostIp: (): void => {
    socket.send(
      JSON.stringify({
        domain: 'system',
        topic: 'get-host-ip',
        value: ''
      })
    )
  },
  copyFileTo: (details: CopyFileToDetails): void => {
    socket.send(
      JSON.stringify({
        domain: 'system',
        topic: 'copy-file-to',
        value: details
      })
    )
  },
  copyFolderContentsTo: (details: CopyFolderContentsToDetails): void => {
    socket.send(
      JSON.stringify({
        domain: 'system',
        topic: 'copy-folder-contents-to',
        value: details
      })
    )
  },
  removeFolderContents: (path: Array<string>): void => {
    socket.send(
      JSON.stringify({
        domain: 'system',
        topic: 'remove-folder-contents',
        value: path
      })
    )
  },
  removeFolder: (path: Array<string>): void => {
    socket.send(
      JSON.stringify({
        domain: 'system',
        topic: 'remove-folder',
        value: path
      })
    )
  }
})

export default settings
