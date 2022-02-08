import { useEffect, useState, useRef } from 'react'
import { db } from '../firebase/config'
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore'

export const useCollection = (col, _orderBy) => {
  const [documents, setDocuments] = useState(null)
  const [error, setError] = useState(null)

  const order = useRef(_orderBy).current

  useEffect(() => {
    let ref = collection(db, col)

    //last created album render first
    if (order) {
      ref = query(ref, orderBy(...order))
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
  }, [col, order])

  return { documents, error }
}
