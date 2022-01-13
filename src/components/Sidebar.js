import { NavLink } from 'react-router-dom'
import { useUserContext } from '../hooks/useUserContext'
import Albums from '../assets/albums.svg'
import AddIcon from '../assets/add_icon.svg'
const Sidebar = () => {
  const { user } = useUserContext()
  return (
    <div className='sidebar'>
      <div className='sidebar-content'>
        <div className='user'>
          <p>Hello {user.displayName}!</p>
        </div>
        <nav className='links'>
          <ul>
            <li>
              <NavLink to='/'>
                <img src={Albums} alt='dashboard icon' />
                <span>Albums</span>
              </NavLink>
            </li>
            <li>
              <NavLink to='/create'>
                <img src={AddIcon} alt='add icon' />
                <span>Add Album</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default Sidebar
