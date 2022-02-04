import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase/config'
import PhotosForReview from '../components/PhotosForReview'

import { useImageContext } from '../context/ImageContext'
import { useDocument } from '../hooks/useDocument'

const CustomerPage = () => {
  const { id } = useParams()
  const [likedImages, setLikedImages] = useState([])
  const [dislikedImages, setDislikedImages] = useState([])
  const [error, setError] = useState(null)
  const { documents, loading } = useDocument(id)
  const { images, setImages } = useImageContext()
  const navigate = useNavigate()

  useEffect(() => {
    if (documents) {
      setImages(documents.images)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [documents])

  const newAlbumFromReview = async () => {
    if (likedImages.length < 1) {
      return
    }
    console.log(likedImages)
    try {
      await addDoc(collection(db, 'albums'), {
        name: `Reviewed ${documents.name}`,
        public: false,
        images: likedImages,
        photographerId: documents.photographerId,
        created: serverTimestamp(),
      })

      navigate('/')
    } catch (e) {
      setError('Fail to upload album')
    }
  }

  return (
    <div>
      {documents && (
        <>
          <h4 className='albumName'>{`Review ${documents.name.toUpperCase()}`}</h4>
          <button className='btn' onClick={newAlbumFromReview}>
            Send Review
          </button>
          {error && <p>{error}</p>}
          <div className='img-flex'>
            {loading && <p>Loading..</p>}
            <PhotosForReview
              images={images}
              likedImages={likedImages}
              setLikedImages={setLikedImages}
              dislikedImages={dislikedImages}
              setDislikedImages={setDislikedImages}
            />
          </div>
        </>
      )}
    </div>
  )
}

export default CustomerPage
