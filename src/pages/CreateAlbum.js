import Dropzone from '../components/Dropzone'
import { useUserContext } from '../hooks/useUserContext'
import { useImageContext } from '../context/ImageContext'
import { useState } from 'react/cjs/react.development'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../firebase/config'

const CreateAlbum = () => {
  const [error, setError] = useState(null)
  const [albumName, setAlbumName] = useState('')
  const { user } = useUserContext()
  const { images, setImages } = useImageContext()
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
      } catch (e) {
        setError('Fail to upload album')
      }
    }
  }
  return (
    <div className='form-container'>
      <div className='create-form'>
        <h3>Create Album</h3>
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
          <Dropzone />
          <button type='submit' className='btn'>
            Upload
          </button>
        </form>
        {error && <p>{error}</p>}
      </div>
    </div>
  )
}

export default CreateAlbum
