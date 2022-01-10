import { useState } from 'react'

const Register = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(username, email, password)
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
      <button className='btn'>Log in</button>
    </form>
  )
}

export default Register
