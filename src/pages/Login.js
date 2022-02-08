import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLogin } from '../hooks/useLogin'
const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, error, isPending } = useLogin()
  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault()
    login(email, password)
    navigate('/')
  }
  return (
    <form className='login-form' onSubmit={handleSubmit}>
      <h2>Login Form</h2>
      <label>
        <span>email:</span>
        <input
          required
          type='email'
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </label>
      <label>
        <span>password:</span>
        <input
          required
          type='password'
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </label>
      {!isPending && <button className='btn'>Log in</button>}
      {isPending && (
        <button className='btn' disabled>
          loading
        </button>
      )}
      {error && <div className='error'>{error}</div>}
    </form>
  )
}

export default Login
