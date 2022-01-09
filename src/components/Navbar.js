import { Link } from 'react-router-dom'
import logo from '../assets/logo.svg'
const Navbar = () => {
  return (
    <nav className='navbar'>
      <ul>
        <li className='logo'>
          <img src={logo} alt='logo' />
          <span>Photo Box</span>
        </li>
        <li>
          <Link to='login'>Login</Link>
        </li>
        <li>
          <Link to='register'>Register</Link>
        </li>
        <li>
          <Link to='logout'>Logout</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
