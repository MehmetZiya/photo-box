import { useRef, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDocument } from '../hooks/useDocument'

import editIcon from '../assets/editIcon.png'
import { useState } from 'react'
import { useUpdateAlbum } from '../hooks/useUpdateAlbum'
import { useImageContext } from '../context/ImageContext'
import { useDeleteImage } from '../hooks/useDeleteImage'
import ImageGrid from '../components/ImageGrid'

const AlbumPage = () => {
  const { id } = useParams()
  const { documents, loading } = useDocument(id)
  const [showInput, setShowInput] = useState(false)

  const updateHook = useUpdateAlbum()
  const albumNameRef = useRef()
  const { images, setImages, setSelectedImages } = useImageContext()
  const useDeleteObj = useDeleteImage()

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

  return (
    <div>
      {documents && (
        <>
          <h4>
            {documents.name}
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
          <button className='btn share'>Share Album</button>
          <div className='selected-album'>
            Create new album with selected images
          </div>
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
