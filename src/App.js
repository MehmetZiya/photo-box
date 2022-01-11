import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useUserContext } from './hooks/useUserContext'

//components
import Navbar from './components/Navbar'
//pages
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'

//style
import './sass/App.scss'

const App = () => {
  const { authIsOK, user } = useUserContext()
  return (
    <div className='App'>
      {authIsOK && (
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path='/' element={!user ? <Login /> : <Home />} />
            <Route path='/login' element={!user ? <Login /> : <Home />} />
            <Route path='/register' element={!user ? <Register /> : <Home />} />
          </Routes>
        </BrowserRouter>
      )}
    </div>
  )
}

export default App
