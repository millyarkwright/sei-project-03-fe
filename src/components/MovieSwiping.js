import { useState, useEffect } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"

// import { userIsAuthenticated } from "./helpers/auth"

const MovieSwiping = () => {

  const { userId } = useParams()
  const [userData, setUserData] = useState([])
  const [allMovies, setAllMovies] = useState([])
  const [likedMovies, setLikedMovies] = useState([])
  const [dislikedMovies, setDislikedMovies] = useState([])

  const handleButtonClick = (event) => {
    console.log(event.target.value)
  }

  useEffect(() => {

    const pullMovies = async () => {
      try {
        const response = await axios.get("http://localhost:4000/movies")
        setAllMovies(response)

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
        console.log(data)
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

  return (
    <> 
      <h2>Select Movie You Like</h2>
      {/* {userIsAuthenticated ? console.log("logged in") : console.log("logged out")} */}
      <div>
        <p>movie div</p>

      </div>
      <button value="yes" onClick={handleButtonClick} >Like</button>
      <button value="no" onClick={handleButtonClick} >Dislike</button>
    </>
  )
}

export default MovieSwiping