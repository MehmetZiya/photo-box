import { createContext, useState, useContext } from 'react'

export const ImageContext = createContext()

export const useImageContext = () => {
  return useContext(ImageContext)
}

export const ImageContextProvider = ({ children }) => {
  const [images, setImages] = useState([])
  const [dropImages, setDropImages] = useState([])
  const [isUploadDone, setIsUploadDone] = useState(true)
  const [newImages, setNewImages] = useState([])
  const [selectedImages, setSelectedImages] = useState([])
  const values = {
    images,
    setImages,
    dropImages,
    setDropImages,
    isUploadDone,
    setIsUploadDone,
    newImages,
    setNewImages,
    selectedImages,
    setSelectedImages,
  }

  return (
    <ImageContext.Provider value={values}>{children}</ImageContext.Provider>
  )
}
