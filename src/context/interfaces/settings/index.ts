export interface Settings {
  powerOff: () => void;
  listUsb: (password: string) => void;
  mountUsb: (password: string, device: string, deviceUuid: string) => void;
  unmountUsb: (password: string, deviceUuid: string) => void;
}

const settings = (socket: WebSocket): Settings => ({
  powerOff: (): void => {
    socket.send(
      JSON.stringify({ domain: 'system', topic: 'power-off', value: '' }),
    );
  },
  listUsb: (password: string): void => {
    socket.send(
      JSON.stringify({ domain: 'system', topic: 'list-usb', value: password }),
    );
  },
  mountUsb: (password: string, device: string, deviceUuid: string): void => {
    socket.send(
      JSON.stringify({
        domain: 'system',
        topic: 'mount-usb',
        value: { password, device, deviceUuid },
      }),
    );
  },
  unmountUsb: (password: string, deviceUuid: string): void => {
    socket.send(
      JSON.stringify({
        domain: 'system',
        topic: 'unmount-usb',
        value: { password, deviceUuid },
      }),
    );
  },
});

export default settings;
