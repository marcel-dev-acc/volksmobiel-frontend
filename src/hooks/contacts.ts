import { useScreenContext } from '../context/ScreenContext'
import axios from '../utils/axios'

const get = async (): Promise<void> => {
  const {setContacts} = useScreenContext()
  const {data} = await axios.get('/contacts/get-contacts')
  setContacts(data)
}

const create = async (contact: object): Promise<void> => {
  await axios.post('/contacts/create-contact', contact)
}

interface UseContacts {
  get: () => Promise<void>
  create: (contact: object) => Promise<void>
}

const useContacts = (): UseContacts => {
  return {
    get,
    create
  }
}

export default useContacts