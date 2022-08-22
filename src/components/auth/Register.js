import {useState} from 'react'
import { useNavigate } from 'react-router-dom'

import axios from 'axios'

// import { apiRequest } from '../helpers/auth'

const Register = () => {
  const navigate = useNavigate()
  const [ formData, setFormData ] = useState({
    email : '',
    username : '',
    password : '',
    confirmedPassword : '',
    // moviesLiked : '',
  })
  const [error, setError ] = useState('')
  const handleChange = (event) => {
    const newObj = { ...formData, [event.target.name]: event.target.value }
    setFormData(newObj)
    setError('')
  }
  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const { data } = await axios.post('http://localhost:4000/register/', formData)
      console.log('DATA ->', data)
      navigate('/login')
    } catch (err) {
      console.log('ERROR ->', err)
      setError(err.response.data.message)
    }
  }
  return (
    <main>
        <form onSubmit={handleSubmit}>
          <h3>Register</h3>
          {/* Username */}
          <label htmlFor="username">Username</label>
          <input onChange={handleChange} type="text" name="username" placeholder="Username" value={formData.username} />
          {/* Email */}
          <label htmlFor="email">Email</label>
          <input onChange={handleChange} type="email" name="email" placeholder='Email' value={formData.email} />
          {/* Password */}
          <label htmlFor="password">Password</label>
          <input onChange={handleChange} type="password" name="password" placeholder='Password' value={formData.password} />
          {/* Password Confirmation */}
          <label htmlFor="confirmedPassword">Confirm Password</label>
          <input onChange={handleChange} type="password" name="confirmedPassword" placeholder='Confirm Password' value={formData.confirmedPassword} />
          {/* Error Message */}
          { error && <p>{error}</p>}
          {/* Submit */}
          <input type="submit" value="Register" />
        </form>
    </main>
  )
}





export default Register

