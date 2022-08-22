import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

import { getToken } from './helpers/auth'

const ProfileEdit = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [profileData, setProfileData] = useState({
    email: '',
    // username : '',
    // password : '',
    moviesLiked: '',
  })

  const [errors, setErrors] = useState({
    email: '',
    // username : '',
    // password : '',
    moviesLiked: '',
  })

  const [singleError, setSingleError] = useState('')
  useEffect(() => {
    const getProfileData = async () => {
      try {
        const { data } = await axios.get(`https://localhost:4500/profile/${id}`)
        setProfileData(data)
      } catch (err) {
        console.log(err)
      }
    }
    getProfileData()
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const { data } = await axios.put(`https://localhost:4500/profile/${id}`, profileData, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      navigate(`/profile/${id}`)
    } catch (err) {
      console.log(err)
    }
  }

  // JSX
}

export default ProfileEdit