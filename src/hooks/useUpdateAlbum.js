import { useState } from 'react'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase/config'

export const useUpdateAlbum = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const updateAlbum = (params, albumId) => {
    setSuccess(false)
    setError(false)
    setIsLoading(true)

    const docRef = doc(db, 'albums', albumId)
    updateDoc(docRef, params)
      .then(() => {
        setSuccess(true)
        setIsLoading(false)
      })
      .catch((e) => {
        setError(e.message)
        setIsLoading(false)
      })
  }
  return { isLoading, error, success, updateAlbum }
}
