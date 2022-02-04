import { deleteDoc, doc } from 'firebase/firestore'
import { useState } from 'react'
import { db } from '../firebase/config'
import { useDeleteImage } from './useDeleteImage'

export const useDeleteAlbum = () => {
  const { remove } = useDeleteImage()
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)

  const deleteAlbum = async (album) => {
    setError(null)
    setIsLoading(true)

    try {
      await deleteDoc(doc(db, 'albums', album.id))
      album.images.map((image) => {
        remove(image)
      })
    } catch (e) {
      setError(e.message)
    } finally {
      setIsLoading(false)
    }
  }
  return {
    error,
    isLoading,
    deleteAlbum,
  }
}
