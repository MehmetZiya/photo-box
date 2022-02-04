import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import PhotosForReview from '../components/PhotosForReview'

import { useImageContext } from '../context/ImageContext'
import { useDocument } from '../hooks/useDocument'

const CustomerPage = () => {
  const { id } = useParams()
  const [likedImages, setLikedImages] = useState([])
  const [dislikedImages, setDislikedImages] = useState([])
  const { documents, loading } = useDocument(id)
  const { images, setImages } = useImageContext()

  useEffect(() => {
    if (documents) {
      setImages(documents.images)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [documents])

  return (
    <div>
      {documents && (
        <>
          <h4 className='albumName'>{`Review ${documents.name.toUpperCase()}`}</h4>
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
