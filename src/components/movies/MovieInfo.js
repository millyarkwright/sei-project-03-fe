// Import React Hooks & Axios
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

// Import React Bootstrap
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'

const MovieInfo = () => {

  const { movieId } = useParams()
  const [movie, setMovie] = useState()
  const [errors, setErrors] = useState('')

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`http://localhost:4000/movies/${movieId}`)
        console.log('data->', data)
        setMovie(data)
      } catch (error) {
        console.log('error->',error)
        setErrors(error)
      }
    }
    getData()
  }, [movieId])

  return (
    <main>
      {movie ?
        <>
        <header className="movieInfo">
          <h1>{movie.name}</h1>
          <div className="imdbRating">
            <p>IMDb RATING</p>
            <p>⭐️ {movie.rating}/10</p>
          </div>
        </header>

        <div className="movieInfo-wrapper">
          <div className="movieImage">
            <img src={movie.image_url} alt="Movie Poster"></img>
          </div>
          <div className="movieDetails">
            <div className="genre-container">
              {movie.genre.map(genre => {
              return (
                <div className="genre" key={genre}>{genre}</div>
              )
              })}
            </div>
            <h3>{movie.desc}</h3>
            <div className="actors-container">
              <h4>Stars</h4>
              {movie.actors.map(actor => {
              return (
                <p className="actors" key={actor}>{actor}</p>
              )
              })}
            </div>
            <div className="directors-container">
              <h4>Director(s)</h4>
              {movie.directors.map(director => {
              return (
                <p className="directors" key={director}>{director}</p>
              )
              })}
            </div>
            <button className="imdbLink"><a href={`https://www.imdb.com${movie.imdb_url}`}target="_blank" rel="noreferrer">Take me to IMDb</a></button>
          </div>
        </div>
        </>
      :
      <h2>
        {errors ? 'Something went wrong. Please try again later.' : 'Loading...'}
      </h2>
      }
    </main>
  )
}

export default MovieInfo

{/* <>
<h1>{movie.name}</h1>
<Row className="movieInfo-wrapper justify-content-center"> 
    <Col className="movieImage col-5" xs="12" lg="4" xl="4">
      <img src={movie.image_url} alt="Movie Poster"></img>
    </Col>
    <Col className="movieDetails col-7" xs="12" lg="8" xl="8">
      <div className="genre-container">
        {movie.genre.map(genre => {
        return (
          <div className="genre" key={genre}>{genre}</div>
        )
        })}
      </div>
      <h3>{movie.desc}</h3>
    </Col>
</Row>
</> */}