import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useUserContext } from './hooks/useUserContext'

//components
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'

//pages
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import CreateAlbum from './pages/CreateAlbum'

//style
import './sass/App.scss'

const App = () => {
  const { authIsOK, user } = useUserContext()
  return (
    <div className='App'>
      {authIsOK && (
        <BrowserRouter>
          {user && <Sidebar />}
          <div className='main-content'>
            <Navbar />
            <Routes>
              <Route path='/' element={!user ? <Login /> : <Home />} />
              <Route path='/login' element={!user ? <Login /> : <Home />} />
              <Route
                path='/register'
                element={!user ? <Register /> : <Home />}
              />
              <Route
                path='/create'
                element={!user ? <Login /> : <CreateAlbum />}
              />
            </Routes>
          </div>
        </BrowserRouter>
      )}
    </div>
  )
}

export default App
