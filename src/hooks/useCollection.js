import { useEffect, useState, useRef } from 'react'
import { db } from '../firebase/config'
import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
} from 'firebase/firestore'

export const useCollection = (col, _q, _orderBy) => {
  const [documents, setDocuments] = useState(null)
  const [error, setError] = useState(null)
  const q = useRef(_q).current
  const order = useRef(_orderBy).current

  useEffect(() => {
    let ref = collection(db, col)
    if (q) {
      ref = query(ref, where(...q))
    }
    if (order) {
      ref = query(ref, where(...q), orderBy(...order))
    }
    const unsubscribe = onSnapshot(
      ref,
      (snapshot) => {
        let results = []
        snapshot.docs.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id })
        })
        setDocuments(results)
        setError(null)
      },
      (error) => {
        console.log(error)
        setError('Could not fetch the data')
      }
    )

    return () => unsubscribe()
  }, [col, q, order])

  return { documents, error }
}
