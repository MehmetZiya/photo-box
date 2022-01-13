import { deleteDoc, doc } from 'firebase/firestore'
import { deleteObject, ref } from 'firebase/storage'
import { useState } from 'react'
import { db, storage } from '../firebase/config'

export const useDeleteImage = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)

  const remove = async (imgPath, imgId) => {
    setError(null)
    setIsLoading(true)

    try {
      const storageRef = ref(storage, imgPath)
      await deleteObject(storageRef)
      await deleteDoc(doc(db, 'images', imgId))
    } catch (e) {
      setError('Image could not be removed')
    } finally {
      setIsLoading(false)
    }
  }

  return { error, isLoading, remove }
}
