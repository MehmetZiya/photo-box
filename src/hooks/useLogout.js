import { useState, useEffect } from 'react'
import { useUserContext } from '../hooks/useUserContext'
import { auth } from '../firebase/config'
import { signOut } from 'firebase/auth'

export const useLogout = () => {
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [isCancelled, setIsCancelled] = useState(false)

  const { dispatch } = useUserContext()

  const logout = async () => {
    setError(null)
    setIsPending(true)

    // logout the user
    try {
      await signOut(auth)
      dispatch({ type: 'LOGOUT' })

      if (!isCancelled) {
        setIsPending(false)
        setError(null)
      }
    } catch (err) {
      if (!isCancelled) {
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
  return { logout, error, isPending }
}
