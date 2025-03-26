import { useScreenContext } from '../context/ScreenContext'
import axios from '../utils/axios'

const get = async (): Promise<void> => {
  const {setMessages} = useScreenContext()
  const {data} = await axios.get('/message/get-message')
  setMessages(data.messages)
}

interface Message {
  number: string
  message: string
}

const send = async (message: Message): Promise<void> => {
  await axios.post('/message/send-message', message)
}

interface UseMessages {
  get: () => Promise<void>
  send: (message: Message) => Promise<void>
}

const useMessages = (): UseMessages => {
  return {
    get,
    send
  }
}

export default useMessages