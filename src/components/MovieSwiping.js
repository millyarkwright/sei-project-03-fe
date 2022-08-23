import { useState, useEffect } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"
import { API_URL } from "../config.js"

import { userIsAuthenticated } from "./helpers/auth"

const MovieSwiping = () => {

  const { userId } = useParams()
  const [movieOrderIndex, setMovieOrderIndex] = useState(0)
  const [userData, setUserData] = useState([])
  const [allMovies, setAllMovies] = useState('')
  const [likedMovies, setLikedMovies] = useState([])
  const [movieId, setMovieId] = useState([])
  const [dislikedMovies, setDislikedMovies] = useState([])
  const [movieDisplayedToUser, setMovieDisplayedToUser] = useState('')
  const [errors, setErrors] = useState('')

  const updateLikedMoviePreferences = async () => {
    setLikedMovies([...likedMovies, movieId[movieOrderIndex]])
    try {
      const res = await axios.put(`${API_URL}/swipe/:userId`, likedMovies)
    } catch (error) {
      console.log(error)
    }
  }

  const updateDislikedMoviePreferences = async () => {
    setDislikedMovies([...dislikedMovies, movieId[movieOrderIndex]])
    try {
      const res = await axios.put(`${API_URL}/swipe/:userId`, dislikedMovies)
    } catch (error) {
      console.log(error)
    }
  }

  const handleButtonClick = (event) => {
    (event.target.value === 'yes') ? updateLikedMoviePreferences() : updateDislikedMoviePreferences()

    setMovieOrderIndex(movieOrderIndex + 1)
  }
  useEffect(() => {
    const pullMovies = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/movies`)
        setAllMovies(data)
        let movieMappedId = data.map(movie=>movie._id)
        setMovieId(movieMappedId)
      } catch (error) {
        console.log(error)
      }
    }
    pullMovies()
  },[])

  useEffect(() => {
    const getUserData = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/profile/${userId}`)
        setUserData(data)
        setLikedMovies(data.moviesLiked)
        setDislikedMovies(data.moviesDisliked)
      } catch (error) {
        console.log(error)
      }
    }
    getUserData()
  }, [])


  useEffect(()=>{
    const getDisplayMovieData = async () => {
      try {
          // if movieOrderIndex === movieId.length then it will break, so we need at a catch for that to say no more movies, please wait for updates
        if (likedMovies.includes(movieId[movieOrderIndex]) || dislikedMovies.includes(movieId[movieOrderIndex])) {
          setMovieOrderIndex(movieOrderIndex+1)
        } else {
          const { data } = await axios.get(`${API_URL}/movies/${movieId[movieOrderIndex]}`)
          console.log('data->', data)

          setMovieDisplayedToUser(data)
        }   
      } catch (error) {
        console.log('error->',error)
        setErrors(error)
      }
    }
    getDisplayMovieData()
  }, [movieOrderIndex])

  return (
    <> 
      <h2>{movieDisplayedToUser.name}</h2>
      {/* {userIsAuthenticated ? console.log("logged in") : console.log("logged out")} */}
      <div>
        <p>movie div</p>
        <p>moviesLiked { likedMovies }</p>
        <p>moviesDisliked { dislikedMovies }</p>

      </div>
      <button value="no" onClick={handleButtonClick} >❌</button>
      <button value="yes" onClick={handleButtonClick} >✅</button>
    </>
  )
}

export default MovieSwiping

  // console.log('movieId[movieOrderIndex]', movieId[movieOrderIndex])
  // console.log('typeof movieId[movieOrderIndex]', typeof movieId[movieOrderIndex])
  // console.log('movieId', movieId)
  // console.log('movieOrderIndex', movieOrderIndex)
  // console.log('likedMovies', likedMovies)
  // console.log('dislikedMovies', dislikedMovies)
  // console.log('allMovies', allMovies)
  // console.log('typeof allMovies', typeof allMovies)
  // console.log('movieId', movieId)

  // console.log(movieOrderIndex)