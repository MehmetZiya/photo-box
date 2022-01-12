import React from 'react'
import ReactDOM from 'react-dom'
import { UserContextProvider } from './context/UserContext'
import { ImageContextProvider } from './context/ImageContext'

import App from './App'

ReactDOM.render(
  <UserContextProvider>
    <ImageContextProvider>
      <App />
    </ImageContextProvider>
  </UserContextProvider>,
  document.getElementById('root')
)
