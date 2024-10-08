import './Navigation.css'
import { HomeCircleOutline } from '../../assets/icons'
import { Screens, useScreenContext } from '../../context/ScreenContext'



const Navigation = () => {
  const {setScreen} = useScreenContext()

  return (
    <div className="navigation">
      <button onClick={() => setScreen(Screens.home)}>
        <HomeCircleOutline />
      </button>
    </div>
  )
}

export default Navigation
