import { Link } from "react-router-dom"
// import {useState, useEffect} from 'react'
// import { Navigate, useNavigate } from 'react-router-dom'
// import { API_URL } from "../config.js"
// import axios from 'axios'

const Homepage = () => {
//   const [error, setError] = useState()
//   const [allMoviesStyling, setAllMoviesStyling] = useState('')

//  useEffect(() => {
//     const pullMovies = async () => {
//       try {
//         const { data } = await axios.get(`${API_URL}/movies`)
//         const movieImages = data.map(movie => movie.image_url)
//         setAllMoviesStyling(Object.values(movieImages).sort(() => 0.5 - Math.random()).slice(0, 20))
//       } catch (error) {
//         setError(error)
//       }
//     }
//     pullMovies()
//   },[])
//   console.log(allMoviesStyling)
//   console.log('allMoviesStyling->',typeof allMoviesStyling)


  return (<>
    <h1>Homepage</h1>
      <h2>Text</h2>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reiciendis aut et, a laudantium nihil minus, inventore earum vel magni quos necessitatibus. Odit optio quos, alias eos excepturi repellendus? Laborum, nesciunt.</p>
        {/* <div>
          <h2>Ingredients</h2>
          <div className="moviePicturesContainer">
          {allMoviesStyling ? allMoviesStyling.map(item => {
            return (<img src={item} alt="Movie Poster"></img>)
          }) : "loading"
          }
          </div> 
          </div> */}
  </>)
}

export default Homepage