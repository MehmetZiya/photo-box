import { useState, useEffect } from 'react'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { auth, db } from '../firebase/config'
import { useUserContext } from './useUserContext'
export const useRegister = () => {
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [isCancelled, setIsCancelled] = useState(false)
  const { dispatch } = useUserContext()

  const register = async (email, password, displayName) => {
    setError(null)
    setIsPending(true)

    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      if (!response) {
        throw new Error(' Register could not be completed')
      }
      updateProfile(auth.currentUser, { displayName })

      //save the user in firebase
      const docRef = doc(db, 'users', response.user.uid)
      await setDoc(docRef, { displayName })

      //dispatch login action
      dispatch({ type: 'LOGIN', payload: response.user })

      if (!isCancelled) {
        setIsPending(false)
        setError(null)
      }
    } catch (err) {
      if (!isCancelled) {
        setIsPending(false)
        setError(err.message)
      }
    }
  }
  useEffect(() => {
    return () => {
      setIsCancelled(true)
    }
  }, [])
  return { isPending, error, register }
}
