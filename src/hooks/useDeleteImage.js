import { useState } from 'react'
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from 'firebase/firestore'
import { deleteObject, ref } from 'firebase/storage'
import { db, storage } from '../firebase/config'

export const useDeleteImage = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)

  const remove = async (image) => {
    setError(null)
    setIsLoading(true)

    try {
      const queryRef = query(
        collection(db, 'albums'),
        where('images', 'array-contains', image)
      )
      const snapshot = await getDocs(queryRef)
      if (snapshot.docs.length < 1) {
        const storageRef = ref(storage, image.path)
        await deleteObject(storageRef)
        await deleteDoc(doc(db, 'images', image.imageRef))
      }
    } catch (e) {
      setError(e.message)
    } finally {
      setIsLoading(false)
    }
  }

  return { error, isLoading, remove }
}
