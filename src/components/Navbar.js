import { Link } from 'react-router-dom'
import logo from '../assets/logo.svg'
import { useLogout } from '../hooks/useLogout'
import { useUserContext } from '../hooks/useUserContext'

const Navbar = () => {
  const { isPending, logout } = useLogout()
  const { user } = useUserContext()
  return (
    <nav className='bar'>
      <ul>
        <li className='logo'>
          <Link to='/'>
            <div className='logo'>
              <img src={logo} alt='logo' />
              <span className='nameLink'>Photo Box</span>
            </div>
          </Link>
        </li>

        {!user && (
          <>
            <li>
              <Link to='login'>Login</Link>
            </li>
            <li>
              <Link to='register'>Register</Link>
            </li>
          </>
        )}
        <li className='addAlbum'>
          <Link to='create'>+ Add</Link>
        </li>

        {user && (
          <li>
            {!isPending && (
              <button className='btn' onClick={logout}>
                Logout
              </button>
            )}
            {isPending && (
              <button className='btn' disabled>
                Logging out...
              </button>
            )}
          </li>
        )}
      </ul>
    </nav>
  )
}

export default Navbar
