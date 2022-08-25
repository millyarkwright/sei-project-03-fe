import { useState, useEffect } from "react"
import { Link } from 'react-router-dom'
import axios from "axios"
import { API_URL } from "../config.js"
import { getUserName } from "./helpers/auth"

// Import React Bootstrap Components 
import Container from 'react-bootstrap/Container'

const MovieSwiping = () => {

  const [count, setCount] = useState(0)
  const [userData, setUserData] = useState([])
  const [moviesRemaining, setMoviesRemaining] = useState()
  const [allMovies, setAllMovies] = useState('')
  const [errors, setErrors] = useState('')
 

  // ! Get all movie data & movie Ids
  useEffect(() => {
    const pullMovies = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/movies`)
        const filteredData = data.filter(movie => {
          const movieAlreadyLiked = userData.moviesLiked.map(likedMovie => likedMovie).includes(movie._id)
          const movieAlreadyDisliked = userData.moviesDisliked.map(dislikedMovie => dislikedMovie).includes(movie._id)
          return !(movieAlreadyLiked || movieAlreadyDisliked)
        })
        // console.log("USer liked", userData.moviesLiked)
        // console.log('filtereddata->', filteredData)
        // console.log('movies liked array', userData.moviesLiked)
        setAllMovies(filteredData)
      } catch (error) {
        setErrors(error)
      }
    }
    pullMovies()
  },[userData])
  console.log('allmovies->',allMovies)

  // If user has been through all movies
  useEffect(() => {
    const moviesRemaining = allMovies.length
    setMoviesRemaining(moviesRemaining)
  },[allMovies])

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

  // ! Handle Button Click & Updated DB

  const handleButtonClick = (event) => {

    if(event.target.name === "likes") {
      const updateLikes = async () => {
        try {
          const { data } = await axios.put(`${API_URL}/preferences/likes/${allMovies[count]._id}`)
          console.log('updatedb - DATA ->', data)
        } catch (error) {
          setErrors(error)
        }
      }
        updateLikes()
      } else {  
        const updateDislikes = async () => {
          try {
            const { data } = await axios.put(`${API_URL}/preferences/dislikes/${allMovies[count]._id}`)
            console.log('updatedb - DATA ->', data)
          } catch (error) {
            setErrors(error)
          }
        }
        updateDislikes()
      }
      setCount(count + 1)
    }
  
  return (
    <main className="movieSwiping-wrapper">
    { allMovies ?
        moviesRemaining === 0 ? 
          <h2>You've been through all the movies! Please wait for an update.</h2> 
        :
        <> 
          <div className='movieSwipe-container'>
            <div className="movie-name">
              <h2 id="movies-name">{allMovies[count].name}</h2>
            </div>
            {/* <p id="year">{allMovies[count].year}</p> */}
            <div className="preference-container">
              <div className="preferenceButtons">
                <button name="dislikes" value="no" id="no" onClick={handleButtonClick} >✕</button>
              </div>
              <div className='movieImage'> 
                <Link to={`/movies/${allMovies[count]._id}`}>  
                  <img src={allMovies[count].image_url} alt="Movie Poster"></img> 
                </Link>
              </div>
              <div className="preferenceButtons">
                <button name="likes" value="yes" id="yes" onClick={handleButtonClick} >✔</button>
              </div>
            </div>
          </div>
        </>
      :
      <>
        {<h2>Loading</h2>}
      </>
    }
  </main>
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


  
    // Update Database with Movie Preferences
    // useEffect(() => {
    //   const updateDb = async () => {
    //     try {
    //       console.log('userpreferences in updatedb useeffect', userPreferences)
    //       const { data } = await axios.put(`${API_URL}/preferences`, userPreferences)
    //       console.log('updatedb - DATA ->', data)
    //     } catch (error) {
    //       setErrors(error)
    //     }
    //   }
    //   updateDb()
    // },[count])
    
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


  // useEffect(()=>{
  //   const getDisplayMovieData = async () => {
  //     try {
  //         // if count === movieId.length then it will break, so we need at a catch for that to say no more movies, please wait for updates
  //       // if (userPreferences.moviesLiked.includes(allMovieIds[count]) || userPreferences.moviesDisliked.includes(allMovieIds[count])) {
  //       //   setCount(count+1)
  //       // } else {
  //         // console.log('allMovieIds[count]',allMovieIds[count])
  //         const { data } = await axios.get(`${API_URL}/movies/${allMovieIds[count]}`)
  //         // allMovies[count]
  //         console.log('getDisplayMovieData data->', data)

  //         setallMovies[count](data)
  //       // }   
  //     } catch (error) {
  //       console.log('error->',error)
  //       setErrors(error)
  //     }
  //   }
  //   getDisplayMovieData()
  // }, [allMovieIds])