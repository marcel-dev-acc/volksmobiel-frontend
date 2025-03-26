import { useScreenContext } from '../context/ScreenContext'
import axios from '../utils/axios'

interface Destination {
  destination: Array<string>
}
interface CopyFileDetails extends Destination {
  filePath: Array<string>
}

const copyFileTo = async (copyDetails: CopyFileDetails): Promise<void> => {
  await axios.post('/settings/copy-file-to', copyDetails)
}

interface CopyFolderDetails extends Destination {
  folderPath: Array<string>
}

const copyFolderContentsTo = async (copyDetails: CopyFolderDetails): Promise<void> => {
  await axios.post('/settings/copy-folder-contents-to', copyDetails)
}

const getHostIp = async (): Promise<void> => {
  const {setHostIp} = useScreenContext()
  const {data} = await axios.get('/settings/get-host-ip')
  setHostIp(data.ipAddress)
}

const listHostnameDetails = async (): Promise<void> => {
  const {setSystemDetails} = useScreenContext()
  const {data} = await axios.get('/settings/list-hostname-details')
  setSystemDetails(prev => [...prev, ...data.hostnameLines])
}

const listNetworkInterfaces = async (): Promise<void> => {
  const {setSystemDetails} = useScreenContext()
  const {data} = await axios.get('/settings/list-network-interfaces')
  setSystemDetails(prev => [...prev, ...data.interfaceLines])
}

const listUsbDevices = async (): Promise<void> => {
  const {setUsbDevices} = useScreenContext()
  const {data} = await axios.get('/settings/list-usb-devices')
  setUsbDevices(data.devices)
}

const mountUsb = async (device: string, uuid: string): Promise<void> => {
  await axios.post('/settings/mount-usb', {device, uuid})
}

const removeFolderContents = async (folderPath: Array<string>): Promise<void> => {
  await axios.post('/settings/remove-folder-contents', {folderPath})
}

const removeFolder = async (folderPath: Array<string>): Promise<void> => {
  await axios.post('/settings/remove-folder', {folderPath})
}

const restart = async (): Promise<void> => {
  await axios.get('/settings/restart')
}

const shutdownAfterDelay = async (delay: number): Promise<void> => {
  await axios.post('/settings/shutdown-after-delay', {delay})
}

const shutdown = async (): Promise<void> => {
  await axios.get('/settings/unmount-usb')
}

const unmountUsb = async (uuid: string): Promise<void> => {
  await axios.post('/settings/shutdown', {uuid})
}

const updateSystem = async (): Promise<void> => {
  await axios.get('/settings/update-system')
}

interface UseSettings {
  copyFileTo: (copyDetails: CopyFileDetails) => Promise<void>
  copyFolderContentsTo: (copyDetails: CopyFolderDetails) => Promise<void>
  getHostIp: () => Promise<void>
  listHostnameDetails: () => Promise<void>
  listNetworkInterfaces: () => Promise<void>
  listUsbDevices: () => Promise<void>
  mountUsb: (device: string, uuid: string) => Promise<void>
  removeFolderContents: (folderPath: Array<string>) => Promise<void>
  removeFolder: (folderPath: Array<string>) => Promise<void>
  restart: () => Promise<void>
  shutdownAfterDelay: (delay: number) => Promise<void>
  shutdown: () => Promise<void>
  unmountUsb: (uuid: string) => Promise<void>
  updateSystem: () => Promise<void>
}

const useSettings = (): UseSettings => {
  return {
    copyFileTo,
    copyFolderContentsTo,
    getHostIp,
    listHostnameDetails,
    listNetworkInterfaces,
    listUsbDevices,
    mountUsb,
    removeFolderContents,
    removeFolder,
    restart,
    shutdownAfterDelay,
    shutdown,
    unmountUsb,
    updateSystem
  }
}

export default useSettings