import { useState } from 'react'
import { useImageContext } from '../context/ImageContext'

const Photos = ({ image, removeImage }) => {
  const [isSelected, setisSelected] = useState(false)
  const { selectedImages, setSelectedImages } = useImageContext()
  const handleImageSelect = () => {
    if (selectedImages.find((i) => i.uuid === image.uuid)) {
      setSelectedImages((selectedImages) =>
        selectedImages.filter((i) => i.uuid !== image.uuid)
      )
      setisSelected(false)
    } else {
      setSelectedImages([...selectedImages, image])
      setisSelected(true)
    }
  }

  return (
    <div className='img-box' key={image.uuid}>
      <img src={image.URL} alt={image.path} />
      <div className='remove-btn' onClick={() => removeImage(image)}>
        <i className='fas fa-times-circle 2-fa'></i>
      </div>
      <input
        type='checkbox'
        checked={isSelected ? true : false}
        onChange={handleImageSelect}
      />
    </div>
  )
}

export default Photos
