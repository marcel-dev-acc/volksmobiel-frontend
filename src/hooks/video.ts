import { useScreenContext } from '../context/ScreenContext'
import axios from '../utils/axios'

const addToPlaylist = async (name: string, filePathArray: Array<string>): Promise<void> => {
  await axios.post('/video/add-to-playlist', {
    name,
    path: 'file:////' + filePathArray.join('/')
  })
}

const autoPlay = async (filePathArray: Array<string>): Promise<void> => {
  await axios.post('/video/auto-play', {
    path: 'file:////' + filePathArray.join('/')
  })
}

const getPlaylist = async (): Promise<void> => {
  const {setPlaylist} = useScreenContext()
  const {data} = await axios.get('/video/get-playlist')
  setPlaylist(data.videos)
}

const playDvd = async (folderPathArray: Array<string>): Promise<void> => {
  await axios.post('/video/play-dvd', {
    path: folderPathArray.join('/')
  })
}

const playPlaylist = async (): Promise<void> => {
  await axios.get('/video/play-playlist')
}

const play = async (filePathArray: Array<string>): Promise<void> => {
  await axios.post('/video/play', {
    path: 'file:////' + filePathArray.join('/')
  })
}

const removeFromPlaylist = async (id: string): Promise<void> => {
  await axios.post('/video/remove-from-playlist', {id})
}

interface UseVideo {
  addToPlaylist: (name: string, filePathArray: Array<string>) => Promise<void>
  autoPlay: (filePathArray: Array<string>) => Promise<void>
  getPlaylist: () => Promise<void>
  playDvd: (folderPathArray: Array<string>) => Promise<void>
  playPlaylist: () => Promise<void>
  play: (filePathArray: Array<string>) => Promise<void>
  removeFromPlaylist: (id: string) => Promise<void>
}

const useVideo = (): UseVideo => {
  return {
    addToPlaylist,
    autoPlay,
    getPlaylist,
    playDvd,
    playPlaylist,
    play,
    removeFromPlaylist
  }
}

export default useVideo