import { useState, useEffect } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"

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

  const handleButtonClick = (event) => {
    (event.target.value === 'yes') ? setLikedMovies(...likedMovies, movieId[movieOrderIndex]) : setDislikedMovies(...dislikedMovies, movieId[movieOrderIndex])
    // not working yet
    setMovieOrderIndex(movieOrderIndex+1)
  }

  useEffect(() => {
    const pullMovies = async () => {
      try {
        const { data } = await axios.get("http://localhost:4000/movies/")
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
        const { data } = await axios.get(`http://localhost:4000/profile/${userId}`)
        setUserData(data)
        setLikedMovies(data.moviesLiked)
        setDislikedMovies(data.moviesDisliked)
      } catch (error) {
        console.log(error)
      }
    }
    getUserData()
  }, [])
  console.log('likedMovies', likedMovies)
  console.log('dislikedMovies', dislikedMovies)
  console.log('allMovies', allMovies)
  console.log('typeof allMovies', typeof allMovies)
  console.log('movieId', movieId)

  // console.log(movieOrderIndex)

  useEffect(()=>{
    const getDisplayMovieData = async () => {
      try {
        const { data } = await axios.get(`http://localhost:4000/movies/${movieId[movieOrderIndex]}`)
        console.log('data->', data)
        setMovieDisplayedToUser(data)
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

      </div>
      <button value="no" onClick={handleButtonClick} >❌</button>
      <button value="yes" onClick={handleButtonClick} >✅</button>
    </>
  )
}

export default MovieSwiping