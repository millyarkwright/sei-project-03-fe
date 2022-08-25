// Import React Hooks & Axios
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

// Import React Bootstrap
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'

// Import Helpers
import NeedToLogIn from '../helpers/redirect.js'


const MovieInfo = () => {

  const { movieId } = useParams()
  const [movie, setMovie] = useState()
  const [errors, setErrors] = useState('')

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`http://localhost:4500/movies/${movieId}`)
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
      <Container className="movieInfo-wrapper">
      { errors ?
        <NeedToLogIn/>
        :
        movie ?
          <>
          <header className="movieInfo">
            <h1>{movie.name}</h1>
            <div className="imdbRating">
              <p>IMDB RATING</p>
              <p>⭐️ {movie.rating}/10</p>
            </div>
          </header>
          <Row className="movieInfo-container">
            <Col className="movieImage" md="4">
              <img src={movie.image_url} alt="Movie Poster"></img>
            </Col>
            <Col className="movieDetails" md="8">
              <div className="genre-container">
                {movie.genre.map(genre => {
                return (
                  <div className="genre" key={genre}>{genre}</div>
                )
                })}
              </div>
              <p className="lead">{movie.desc}</p>
              <div>
                <h4>Stars</h4>
                <div className="actors-container">
                  {movie.actors.map(actor => {
                  return (
                    <p className="actors" key={actor}>{actor}</p>
                  )
                  })}
                </div>
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
            </Col>
          </Row>
          </>
          :
          <h2>
            {errors ? 'Something went wrong. Please try again later.' : 'Loading...'}
          </h2>
      }
      </Container>
  )
}

export default MovieInfo




{/* <Row className="movie-container p-3 py-5 mx-2 bg-gradient justify-content-center">
<h1 className="text-center fw-bold">{movie.name}</h1>
<div className="imdbRating">
  <p>IMDb RATING</p>
   <p>⭐️ {movie.rating}/10</p>
</div>
{ movie ?
  <Row>
    <Col className="movieImage text-center text-lg-start col-5" xs="12" lg="4" xl="4"  >
      <img className="bg-gradient" src={movie.image_url} alt="Movie Poster" />
    </Col>
    <Col className="movie-details mt-3 mt-lg-0 bg-gradient" xs="12" lg="8" xl="8" pl-lg="0">
      <Row>
        <Col xs="12">
          <h3 className='fw-semibold'>{movie.desc}</h3>
        </Col>
      </Row>
      <Row>
        <Col xs="6">
          <h3 className='fw-semibold'>Stars</h3>
        </Col>
        <Col xs="6">
          {movie.actors.map(actor => {
            return (
            <Col>
              <p className="actors" key={actor}>{actor}</p>
            </Col>
          )
        </Col>
      </Row>
      <Row>
        <Col xs="6">
          <h3 className='fw-semibold'>Directors</h3>
        </Col>
        <Col xs="6">
          <h3>Director Names</h3>
        </Col>
      </Row>
    </Col>
  </Row>
:
<h2 className="text-center">
  {errors ? 'Something went wrong. Please try again later.' : 'Loading'}
</h2>
}
</Row> */}







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