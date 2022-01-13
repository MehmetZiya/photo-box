import { useState } from 'react'
import Dropzone from '../components/Dropzone'
import { useUserContext } from '../hooks/useUserContext'
import { useImageContext } from '../context/ImageContext'
import { useDeleteImage } from '../hooks/useDeleteImage'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../firebase/config'
import Images from '../components/Images'
import { useNavigate } from 'react-router-dom'

const CreateAlbum = () => {
  const [error, setError] = useState(null)
  const [albumName, setAlbumName] = useState('')
  const { user } = useUserContext()
  const { images, setImages } = useImageContext()
  const navigate = useNavigate()
  const useDeleteObj = useDeleteImage()
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!images.length) {
      setError('No image uploaded')
    } else {
      try {
        await addDoc(collection(db, 'albums'), {
          name: albumName,
          public: false,
          images,
          photographerId: user.uid,
        })
        setImages([])
        setAlbumName('')
        navigate('/')
      } catch (e) {
        setError('Fail to upload album')
      }
    }
  }
  const handleRemoveImage = (img) => {
    useDeleteObj.remove(img.path, img.uuid)
    setImages((images) => images.filter((image) => image.uuid !== img.uuid))
  }
  return (
    <div className='form-container'>
      <div className='create-form'>
        <h3>Add Album</h3>
        <form onSubmit={handleSubmit}>
          <label>
            <span>Album name:</span>
            <input
              type='text'
              required
              onChange={(e) => setAlbumName(e.target.value)}
              value={albumName}
            />
          </label>
          <button type='submit' className='btn'>
            Upload
          </button>
        </form>
        <Dropzone />
        <Images images={images} onRemove={handleRemoveImage} />
        {error && <p>{error}</p>}
      </div>
    </div>
  )
}

export default CreateAlbum
