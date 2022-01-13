import { useContext } from 'react'
import { UserContext } from '../context/UserContext'

export const useUserContext = () => {
  const context = useContext(UserContext)
  return context
}
