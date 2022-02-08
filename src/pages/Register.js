import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRegister } from '../hooks/useRegister'

const Register = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const { isPending, error, register } = useRegister()

  const handleSubmit = (e) => {
    e.preventDefault()
    register(email, password, username)
    navigate('/')
  }
  return (
    <form className='login-form' onSubmit={handleSubmit}>
      <h2>Register Form</h2>
      <label>
        <span>username:</span>
        <input
          required
          type='text'
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
      </label>
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
      {!isPending && <button className='btn'>Register</button>}
      {isPending && (
        <button disabled className='btn'>
          Loading..
        </button>
      )}
      {error && <div className='error'>{error}</div>}
    </form>
  )
}

export default Register
