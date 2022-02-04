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
import AlbumPage from './pages/AlbumPage'
import CustomerPage from './pages/CustomerPage'

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
              <Route
                path='albums/:id'
                element={!user ? <Login /> : <AlbumPage />}
              />
              <Route path='customer/:id' element={<CustomerPage />} />
            </Routes>
          </div>
        </BrowserRouter>
      )}
    </div>
  )
}

export default App
