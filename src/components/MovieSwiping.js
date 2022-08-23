import { useState, useEffect } from "react"
import axios from "axios"
import { API_URL } from "../config.js"
import { getUserName } from "./helpers/auth"

const MovieSwiping = () => {

  // const { userId } = useParams()
  const [count, setCount] = useState(0)
  const [userData, setUserData] = useState([])
  const [allMovies, setAllMovies] = useState('')
  const [allMovieIds, setAllMovieIds] = useState([])
  const [movieDisplayedToUser, setMovieDisplayedToUser] = useState('')
  const [errors, setErrors] = useState('')
  const [userPreferences, setUserPreferences] = useState({
    moviesLiked: [],
    moviesDisliked: []
  })

  // ! Get all movie data & movie Ids
  useEffect(() => {
    const pullMovies = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/movies`)
        setAllMovies(data)
        const movieMappedId = data.map(movie=>movie._id)
        setAllMovieIds(movieMappedId)
      } catch (error) {
        setErrors(error)
      }
    }
    pullMovies()
  },[])

  // console.log('count',count)
  // console.log('allMovieIds[count]',allMovieIds[count])


  // ! Display Movie
  useEffect(()=>{
    const getDisplayMovieData = async () => {
      try {
          // if count === movieId.length then it will break, so we need at a catch for that to say no more movies, please wait for updates
        // if (userPreferences.moviesLiked.includes(allMovieIds[count]) || userPreferences.moviesDisliked.includes(allMovieIds[count])) {
        //   setCount(count+1)
        // } else {
          // console.log('allMovieIds[count]',allMovieIds[count])
          const { data } = await axios.get(`${API_URL}/movies/${allMovieIds[count]}`)
          console.log('getDisplayMovieData data->', data)

          setMovieDisplayedToUser(data)
        // }   
      } catch (error) {
        console.log('error->',error)
        setErrors(error)
      }
    }
    getDisplayMovieData()
  }, [allMovieIds])


  // ! Get User Data

  useEffect(() => {
    const getUserData = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/profile`)
        console.log('userdata', data)
        setUserData(data)
      } catch (error) {
        console.log(error)
      }
    }
    getUserData()
  }, [])

  

    // Update Database with Movie Preferences
    useEffect(() => {
      const updateDb = async () => {
        try {
          console.log('userpreferences in updatedb useeffect', userPreferences)
          const { data } = await axios.put(`${API_URL}/profile/preferences`, userPreferences)
          console.log('updatedb - DATA ->', data)
        } catch (error) {
          setErrors(error)
        }
      }
      updateDb()
    },[count])
  
  // ! Handle Click 

  const handleButtonClick = (event) => {
    // (event.target.value === 'yes') ? updateMovieLikedPreferences() : updateMoviesDislikedPreferences()

    if (event.target.name === "moviesLiked") {
      userPreferences.moviesLiked.push(allMovieIds[count])
  } else { 
      userPreferences.moviesDisliked.push(allMovieIds[count])
    // setUserPreferences 
    } 
    setCount(count + 1)
  }


  return (
    <> 
      <h2>{movieDisplayedToUser.name}</h2>
      {/* <div className='moviePicture'> <img src = { movieDisplayedToUser.image_url } alt="Movie Poster"></img> </div> */}
      <p> { movieDisplayedToUser.year } </p>
      <p> { movieDisplayedToUser.genre } </p>
      {/* {userIsAuthenticated ? console.log("logged in") : console.log("logged out")} */}
      <div>
        <p>movie div</p>
        <p>moviesLiked { userPreferences.moviesLiked }</p>
        <p>moviesDisliked { userPreferences.moviesDisliked }</p>

      </div>
      <button name="moviesDisliked" value="no" onClick={handleButtonClick} >❌</button>
      <button name="moviesLiked" value="yes" onClick={handleButtonClick} >✅</button>
    </>
  )
  }

export default MovieSwiping

  // console.log('movieId[count]', movieId[count])
  // console.log('typeof movieId[count]', typeof movieId[count])
  // console.log('movieId', movieId)
  // console.log('count', count)
  // console.log('likedMovies', likedMovies)
  // console.log('moviesDisliked', moviesDisliked)
  // console.log('allMovies', allMovies)
  // console.log('typeof allMovies', typeof allMovies)
  // console.log('movieId', movieId)

  // console.log(count)



    
  // const updateMovieLikedPreferences = async () => {
  //   setUserPreferences(userPreferences.moviesLiked = [...userPreferences.moviesLiked, movieId[count]])
  //   try {
  //     const res = await axios.put(`${API_URL}/profile/likes/${username}`, userPreferences)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  // const updateMoviesDislikedPreferences = async () => {
  //   setUserPreferences(userPreferences.moviesDisliked = [...userPreferences.moviesDisliked, movieId[count]])
  //   try {
  //     const res = await axios.put(`${API_URL}/profile/dislikes/${username}`, userPreferences)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
