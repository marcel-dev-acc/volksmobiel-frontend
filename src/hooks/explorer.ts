import { useScreenContext } from '../context/ScreenContext'
import axios from '../utils/axios'

const list = async (pathItems: Array<string>): Promise<void> => {
  const {setExploredItems, setExplorePath} = useScreenContext()
  const {data} = await axios.post('/contacts/create-contact', {pathItems})
  setExploredItems(data.items)
  setExplorePath(data.pathItems)
}

interface UseExplorer {
  list: (pathItems: Array<string>) => Promise<void>
}

const useExplorer = (): UseExplorer => {
  return {
    list
  }
}

export default useExplorer