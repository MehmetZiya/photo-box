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
  const [isAllPhotosReviewed, setIsAllPhotosReviewed] = useState(null)
  const { documents, loading } = useDocument(id)
  const { images, setImages } = useImageContext()
  const navigate = useNavigate()

  useEffect(() => {
    if (documents) {
      setImages(documents.images)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [documents])

  useEffect(() => {
    if (likedImages.length + dislikedImages.length === images.length) {
      setIsAllPhotosReviewed(false)
    }
  }, [dislikedImages.length, images.length, likedImages.length])

  const newAlbumFromReview = async () => {
    if (likedImages.length < 1) {
      setIsAllPhotosReviewed(true)
      return
    }
    if (likedImages.length + dislikedImages.length !== images.length) {
      setIsAllPhotosReviewed(true)
      return
    }
    if (likedImages.length + dislikedImages.length === images.length) {
      setIsAllPhotosReviewed(false)
    }

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
          {isAllPhotosReviewed && <p>Please review all photos</p>}
          <div className='reviewed-photos'>
            {likedImages.length > 0 && (
              <div className='small-photos-box'>
                <h5>Liked Photos</h5>
                <div className='small-photos'>
                  {likedImages.map((image, i) => (
                    <div className='image-box' key={i}>
                      <img src={image.URL} alt={image.name} />
                    </div>
                  ))}
                </div>
              </div>
            )}
            {dislikedImages.length > 0 && (
              <div className='small-photos-box'>
                <h5>Disliked Photos</h5>
                <div className='small-photos'>
                  {dislikedImages.map((image, i) => (
                    <div className='image-box' key={i}>
                      <img src={image.URL} alt={image.name} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
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
