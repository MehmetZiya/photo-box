import { useEffect, useState } from 'react'
import { useUserContext } from '../hooks/useUserContext'
import { auth } from '../firebase/config'
import { signInWithEmailAndPassword } from 'firebase/auth'

export const useLogin = () => {
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [isCancelled, setIsCancelled] = useState(false)
  const { dispatch } = useUserContext()

  const login = async (email, password) => {
    setError(null)
    setIsPending(true)

    //login the user
    try {
      const response = await signInWithEmailAndPassword(auth, email, password)
      dispatch({ type: 'LOGIN', payload: response.user })
      if (!isCancelled) {
        setIsPending(false)
        setError(null)
      }
    } catch (err) {
      if (!isCancelled) {
        console.log(err.message)
        setError(err.message)
        setIsPending(false)
      }
    }
  }
  useEffect(() => {
    return () => {
      setIsCancelled(true)
    }
  }, [])
  return { login, error, isPending }
}
