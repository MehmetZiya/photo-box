import { useRef, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDocument } from '../hooks/useDocument'
import { useNavigate } from 'react-router-dom'
import editIcon from '../assets/editIcon.png'
import { useState } from 'react'
import { useUpdateAlbum } from '../hooks/useUpdateAlbum'
import { useImageContext } from '../context/ImageContext'
import { useDeleteImage } from '../hooks/useDeleteImage'
import ImageGrid from '../components/ImageGrid'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase/config'
import { useUserContext } from '../hooks/useUserContext'

const AlbumPage = () => {
  const { id } = useParams()
  const { documents, loading } = useDocument(id)
  const [showInput, setShowInput] = useState(false)
  const [error, setError] = useState(null)
  const [reviewLink, setReviewLink] = useState(null)
  const navigate = useNavigate()
  const updateHook = useUpdateAlbum()
  const albumNameRef = useRef()
  const { images, setImages, selectedImages, setSelectedImages } =
    useImageContext()
  const useDeleteObj = useDeleteImage()
  const { user } = useUserContext()
  useEffect(() => {
    if (documents) {
      setImages(documents.images)
    }
    setSelectedImages([])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [documents])

  useEffect(() => {
    if (documents) {
      updateHook.updateAlbum({ images }, id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images])

  const handleRemoveImage = (params) => {
    const stayedImages = images.filter((image) => image.uuid !== params.uuid)
    updateHook.updateAlbum({ images: stayedImages }, id)
    useDeleteObj.remove(params)
  }
  const updateName = (e) => {
    e.preventDefault()

    if (albumNameRef.current.value !== '') {
      updateHook.updateAlbum({ name: albumNameRef.current.value }, id)
    }
  }

  const newAlbumFromSelected = async () => {
    if (selectedImages.length < 1) {
      return
    }
    try {
      await addDoc(collection(db, 'albums'), {
        name: `new Album from ${documents.name}`,
        public: false,
        images: selectedImages,
        photographerId: user.uid,
        created: serverTimestamp(),
      })

      navigate('/')
    } catch (e) {
      setError('Fail to upload album')
    }
  }

  const handleShareAlbum = () => {
    let baseURL = window.location.protocol + '//' + window.location.host + '/'
    setReviewLink(`${baseURL}review/${id}`)
  }
  return (
    <div>
      {documents && (
        <>
          <h4 className='albumName'>
            {documents.name.toUpperCase()}
            <span>
              <img
                className='editIcon'
                src={editIcon}
                onClick={() => setShowInput(!showInput)}
                alt='edit'
              />
            </span>
          </h4>

          {showInput && (
            <form onSubmit={updateName}>
              <input
                className='name-input'
                type='text'
                ref={albumNameRef}
                placeholder='change album name'
              />
              <button type='submit' className='btn'>
                update
              </button>
            </form>
          )}
          <div className='btn-box'>
            <button className='btn share' onClick={handleShareAlbum}>
              Share Album
            </button>
            <button className='btn addNew'>Add Photo</button>
          </div>
          {reviewLink && (
            <p style={{ overflowWrap: 'break-word' }}>
              Share your album: <a href={reviewLink}>{reviewLink}</a>
            </p>
          )}
          <div className='selected-album' onClick={newAlbumFromSelected}>
            Create new album with selected images
          </div>
          <p>{error}</p>
          <div className='img-flex'>
            {loading && <p>Loading..</p>}

            <ImageGrid images={images} removeImage={handleRemoveImage} />
          </div>
        </>
      )}
    </div>
  )
}

export default AlbumPage
