import { useEffect, useState } from 'react'
import { SRLWrapper } from 'simple-react-lightbox'
import Photos from './Photos'

const PhotosForReview = ({
  images,
  likedImages,
  setLikedImages,
  dislikedImages,
  setDislikedImages,
}) => {
  const [animate, setAnimate] = useState(false)

  const likebagdeClasses = `review-count ${animate ? 'bump' : ''} `

  useEffect(() => {
    if (likedImages.length === 0) {
      return
    }
    setAnimate(true)

    const timer = setTimeout(() => {
      setAnimate(false)
    }, 200)

    return () => {
      clearTimeout(timer)
    }
  }, [likedImages])

  const reviewPhotos = (image, e) => {
    if (e.target.id === 'like') {
      if (likedImages.includes(image)) {
        return
      }
      if (dislikedImages.includes(image)) {
        let newReview = dislikedImages.filter((i) => i !== image)
        setDislikedImages(newReview)
        setLikedImages([...likedImages, image])
        setAnimate(true)
      } else {
        setLikedImages([...likedImages, image])
        setAnimate(true)
      }
    }

    if (e.target.id === 'dislike') {
      if (dislikedImages.includes(image)) {
        return
      }
      if (likedImages.includes(image)) {
        let newReview = likedImages.filter((i) => i !== image)
        setLikedImages(newReview)
        setDislikedImages([...dislikedImages, image])
        setAnimate(true)
      } else {
        setDislikedImages([...dislikedImages, image])
        setAnimate(true)
      }
    }
  }

  return (
    <div className='review-page'>
      <div className={likebagdeClasses}>
        {likedImages.length > 0 && (
          <span className='like-count'>
            <span className='badge like-badge'>{likedImages.length}</span>
            {` photos liked `}
          </span>
        )}

        {dislikedImages.length > 0 && (
          <span className='dislike-count bump'>
            <span className='badge dislike-badge'>{dislikedImages.length}</span>
            {` photos disliked. `}
          </span>
        )}
      </div>

      <SRLWrapper>
        <div className='image-flex'>
          {images.map((image) => (
            <div key={image.uuid}>
              <Photos image={image} />
              <div className='review-btn'>
                <i
                  className='far fa-thumbs-up'
                  id='like'
                  onClick={(e) => reviewPhotos(image, e)}
                ></i>
                <i
                  className='far fa-thumbs-down'
                  id='dislike'
                  onClick={(e) => reviewPhotos(image, e)}
                ></i>
              </div>
            </div>
          ))}
        </div>
      </SRLWrapper>
    </div>
  )
}

export default PhotosForReview
