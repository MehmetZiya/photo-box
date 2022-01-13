import { useEffect, useState } from 'react'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase/config'

export const useDocument = (id) => {
  const [documents, setDocuments] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    const docRef = doc(db, 'albums', id)
    const unsub = onSnapshot(docRef, (snapshot) => {
      if (!snapshot.exists()) {
        setDocuments(false)
        setLoading(false)
        return
      }
      setDocuments({ _id: snapshot.id, ...snapshot.data() })
      setLoading(false)
    })
    return unsub
  }, [id])
  return {
    loading,
    documents,
  }
}
