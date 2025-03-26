import axios from '../utils/axios'

const startCall = async (number: string): Promise<void> => {
  await axios.post('/phone/start-call', {number})
}

const endCall = async (number: string): Promise<void> => {
  await axios.post('/phone/end-call', {number})
}

interface UsePhone {
  startCall: (number: string) => Promise<void>
  endCall: (number: string) => Promise<void>
}

const usePhone = (): UsePhone => {
  return {
    startCall,
    endCall
  }
}

export default usePhone