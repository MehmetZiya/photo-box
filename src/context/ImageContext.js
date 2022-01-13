import { createContext, useState, useContext } from 'react'

export const ImageContext = createContext()

export const useImageContext = () => {
  return useContext(ImageContext)
}

export const ImageContextProvider = ({ children }) => {
  const [images, setImages] = useState([])
  const [isUploadDone, setIsUploadDone] = useState(true)
  const values = { images, setImages, isUploadDone, setIsUploadDone }

  return (
    <ImageContext.Provider value={values}>{children}</ImageContext.Provider>
  )
}
