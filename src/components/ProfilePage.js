import { useState, useEffect } from "react"
import axios from "axios"
import { API_URL } from "../config.js"
import { useNavigate } from 'react-router-dom'

// Import React Bootstrap Components 
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'

// Import Helpers
import NeedToLogIn from './helpers/redirect.js'
// import { UnauthorisedMessage } from "./helpers/auth.js"

const ProfilePage = () => {

  const navigate = useNavigate()
  
  const [userInfo, setUserInfo] = useState([])
  const [movies, setMovies] = useState()
  const [moviesLiked, setMoviesLiked] = useState([])
  const [moviesDisliked, setMoviesDisliked] = useState([])
  const [userPasswords, setUserPasswords] = useState({
    password: '',
    newPassword: '',
    newConfirmPassword: ''
  })

  const [error, setError] = useState()
  const [errorStatus, setErrorStatus] = useState()


  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/profile`)
        console.log("user data", data)
        console.log("user data", data.moviesLiked)
        setUserInfo(data)
        setMoviesLiked(data.moviesLiked)
        setMoviesDisliked(data.moviesDisliked)
      } catch (error) {
        console.log(error)
        setError(error)
        setErrorStatus(error.response.status)
      }
    }
    getUserInfo()
  }, [])

  useEffect(() => {
    const getMovieData = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/movies`)
        // console.log('movie data', data)
        // setAllMoviesStyling(Object.values(movieImages)
        setMovies(data)
      } catch (error) {
        setError(error)
      }
    }
    getMovieData()
  }, [])


  const handleChange = (event) => {
    console.log('userpassword in hc->', userPasswords)
    const newObj = { ...userPasswords, [event.target.name]: event.target.value }
    console.log('newdata', newObj)
    setUserPasswords(newObj)
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault()
    try {
      const { data } = await axios.put(`${API_URL}/profile`, userPasswords)
      console.log('handleformsubmit data', data)
    } catch (error) {
      setError(error)
      setErrorStatus(error.response.status)
      console.log("pw change error", error)
    }
  }

  return (
    <>
      { errorStatus === 401 ? 
        // <UnauthorisedMessage/>
        <NeedToLogIn/>
      :
      <Container className="profile-wrapper bg-gradient">
        <Row>
          <h1>git adProfile</h1>
        </Row>
        <Row className="userDetails">
          <Row>
            <Col sm="6">
              <h3  className="fw-bold">Username</h3>
            </Col>
            <Col sm="6">
              <h3>{userInfo.username}</h3>
            </Col>
          </Row>
          <Row>
            <Col sm="6">
              <h3  className="fw-bold">Email Address</h3>
            </Col>
            <Col sm="6">
              <h3>{userInfo.email}</h3>
            </Col>
          </Row>
        </Row>
        {/* <Row className='moviePrefences-container'>
          <h3 className='fw-semibold'>Movie Preferences</h3>
          <Col sm="6">
            <h4>Movie Likes</h4>
              {moviesLiked.map(item => {
                return (
              <p>{item}</p>
              )})}
          </Col>
          <Col sm="6">
            <h4>Movie Dislikes</h4>
            {moviesDisliked.map(item => {
              return (
              <p>{item}</p>
              )})}
          </Col>
        </Row> */}
        <Row className='changePassword-container'>
          <h3>Change Password</h3>
          <form onSubmit={handleFormSubmit} className="change-password-fields">
              <input type="password" name="password" placeholder="Your current password" onChange={handleChange} />
              <input type="password" name="newPassword" placeholder="Your new password" onChange={handleChange} />
              <input type="password" name="newConfirmPassword" placeholder="Confirm new password" onChange={handleChange}/>
              <input type="submit" value="Change Password"/>
              { error && <p>{error.message}</p>}
          </form>
        </Row>
      </Container>
      }
      </>
    )
}


export default ProfilePage

{/* <div className="user-info-div">
<div className="left-column-user-info">
  <p>Your username is:</p>
  <p>Your email is:</p>
  <p>You created this account on: </p>
</div>
<div className="right-column-user-info">
  <p>{userInfo.username}</p>
  <p>{userInfo.email}</p>
  <p>{userInfo.createdAt}</p>
</div>
</div>
<div className="change-password">
<form onSubmit={handleFormSubmit}>
  <h3>Change Password</h3>
  <div className="change-password-text">
    <p>Enter current password</p>
    <p>Enter new password</p>
    <p>Confirm new password</p>
  </div>
  <div className="change-password-fields">
    <input type="password" name="currentPassword" placeholder="Your current password" onChange={handleChange} />
    <input type="password" name="newPassword" placeholder="Your new password" onChange={handleChange} />
    <input type="password" name="newPasswordConfirm" placeholder="Confirm new password" onChange={handleChange} />
  </div>
  <input type="submit" value="Change Password" />
</form>
</div> */}