import { useState, useEffect } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"

import { userIsAuthenticated } from "./helpers/auth"

const MovieSwiping = () => {

  const { userId } = useParams()
  const [userData, setUserData] = useState([])
  const [allMovies, setAllMovies] = useState('')
  const [likedMovies, setLikedMovies] = useState([])
  const [dislikedMovies, setDislikedMovies] = useState([])

  const handleButtonClick = (event) => {
    console.log(event.target.value)
  }

  useEffect(() => {

  //   const getAllFilms = async () => {
  //     try {
  //       // Put method is used when we're updating an existing document on the database
  //       const { data } = await axios.get("https://localhost:4000/movies/")
  //         // need to add { to the end of line 24 for code to work
  //         // headers: {
  //         //   Authorization: `Bearer ${getToken()}`,
  //         // },
  //       // })
  //       // need to delete bracket from end of line 24 for this to work
  //       setAllMovies(data)
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }
  //   getAllFilms()
  // },[])

    const pullMovies = async () => {
      try {
        const { data } = await axios.get("http://localhost:4000/movies/")
        setAllMovies(data)
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
        // console.log(data)
        setUserData(data)
        setLikedMovies(data.moviesLiked)
        setDislikedMovies(data.moviesDisliked)
      } catch (error) {
        console.log(error)
      }
    }
    getUserData()
  }, [])
  

  console.log(likedMovies)
  console.log(dislikedMovies)
  console.log('allMovies', allMovies)
  console.log('typeof allMovies', typeof allMovies)

  allMovies.map(movie=>movie._id)

  console.log(allMovies)

  return (
    <> 
      <h2>Select Movie You Like</h2>
      {userIsAuthenticated ? console.log("logged in") : console.log("logged out")}
      <div>
        <p>movie div</p>

      </div>
      <button value="yes" onClick={handleButtonClick} >Like</button>
      <button value="no" onClick={handleButtonClick} >Dislike</button>
    </>
  )
}

export default MovieSwiping