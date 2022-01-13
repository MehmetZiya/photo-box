import React from 'react'
import ReactDOM from 'react-dom'
import { UserContextProvider } from './context/UserContext'
import { ImageContextProvider } from './context/ImageContext'
import SimpleReactLightbox from 'simple-react-lightbox'

import App from './App'

ReactDOM.render(
  <UserContextProvider>
    <ImageContextProvider>
      <SimpleReactLightbox>
        <App />
      </SimpleReactLightbox>
    </ImageContextProvider>
  </UserContextProvider>,
  document.getElementById('root')
)
