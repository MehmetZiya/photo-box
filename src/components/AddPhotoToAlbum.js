import Dropzone from '../components/Dropzone'
import { useDeleteImage } from '../hooks/useDeleteImage'
import Images from '../components/Images'
import { useImageContext } from '../context/ImageContext'

const AddPhotoToAlbum = ({ handleAddPhoto }) => {
  const { dropImages, setDropImages } = useImageContext()
  const useDeleteObj = useDeleteImage()

  const handleRemoveImage = (img) => {
    useDeleteObj.remove(img)
    setDropImages((images) => images.filter((image) => image.uuid !== img.uuid))
  }
  return (
    <div>
      <Dropzone />
      {dropImages.length > 0 && <p>Added photos to the Album :</p>}
      <Images images={dropImages} onRemove={handleRemoveImage} />
      <button className='btn' onClick={handleAddPhoto}>
        Updade Album
      </button>
    </div>
  )
}

export default AddPhotoToAlbum
