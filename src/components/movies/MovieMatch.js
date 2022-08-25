import {useState, useEffect} from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { API_URL } from "../../config.js"
import axios from 'axios'

const Match = () => {


  const navigate = useNavigate()
  // ! State
  const [userData, setUserData] = useState()
  const [allUsersAndTheirLikes, setAllUsersAndTheirLikes] = useState([])
  const [watchWith, setWatchWith] = useState({username: ''})
  const [error, setError] = useState()
  // const [userExists, setUserExists] = useState(false)
  const [filteredMovies, setFilteredMovies] = useState([])
  // const [allMoviesStyling, setAllMoviesStyling] = useState('')

  console.log('watch with', watchWith)

  // useEffect(() => {
  //   const pullMovies = async () => {
  //     try {
  //       const { data } = await axios.get(`${API_URL}/movies`)
  //       const movieImages = data.map(movie => movie.image_url)
  //       setAllMoviesStyling(Object.values(movieImages).sort(() => 0.5 - Math.random()).slice(0, 20))
  //     } catch (error) {
  //       setError(error)
  //     }
  //   }
  //   pullMovies()
  // },[])
  // console.log(allMoviesStyling)
  // console.log('allMoviesStyling->',typeof allMoviesStyling)

  // Get LoggedIn User Data
  useEffect(() => {
    const getUserData = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/profile`)
        console.log('userdata', data)
        setUserData(data)
      } catch (error) {
        console.log(error)
        setError(error)
      }
    }
    getUserData()
  }, [])

  //   // Get all user preferences

  useEffect(() => {
    const getAllUsersAndTheirLikes = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/preferences/all`)
        console.log('alluserPreference data', data)
        setAllUsersAndTheirLikes(data)
        console.log(allUsersAndTheirLikes)
      } catch (error) {
        console.log(error)
        setError(setError)
      }
    }
    getAllUsersAndTheirLikes()
  }, [])
  console.log('allUsersAndTheirLikes', allUsersAndTheirLikes)


  // ! Executions

  const handleFieldChange = (event) => {
    const newObj = { ...watchWith, [event.target.name]: event.target.value}
    console.log('newObj', newObj)
    setWatchWith(newObj)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    // ERROR TEST

    const foundUser = allUsersAndTheirLikes.find(user => user.username === watchWith.username)

    console.log('foundUser (handlesub)->',foundUser)

    if (foundUser) {
      const userMoviesLiked = userData.moviesLiked
      const foundUserMoviesLiked = foundUser.moviesLiked
      const filteredMovies = userMoviesLiked.filter((movie) => {
              return foundUserMoviesLiked.includes(movie)
    })
    if (filteredMovies.length === 0){
      setError({message: 'no films, pls like more films :)' })
    } else {
    navigate(`/movies/${filteredMovies[Math.floor(Math.random() * filteredMovies.length)]}`)}
    } else {
      setError({ message: 'Please enter a valid username'})
    }
  }


  //   const userMoviesLiked = userData.moviesLiked
    // const foundUserMoviesLiked = foundUser.moviesLiked
  // console.log(moviesInCommon)
  console.log(filteredMovies)
  // console.log('allUsersAndTheirLikes', allUsersAndTheirLikes)
  // console.log('foundUser->',foundUser)
  // console.log('error', error)



  // ! JSX

return (
  <main className="movieMatch">
    <div className='match-container'>
      <h1> I am watching with...  </h1>
      <div className='form'>
        <form onSubmit={handleSubmit}>
            <input 
              type='text'
              name='username' 
              value={watchWith.username}
              placeholder='Username' 
              onChange={handleFieldChange}>
            </input>
            <input type='submit' value="Submit" className='btn w-100'/>
        </form>
      </div>   
      <h2> {error && error.message} </h2>
    </div>
  </main>
)
}

export default Match


//   // ! Get Logged In User Data - do we need?
//   useEffect(() => {
//     const getUserData = async () => {
//       try {
//         const { data } = await axios.get(`${API_URL}/profile`)
//         console.log('userdata', data)
//         setUserData(data)
//       } catch (error) {
//         console.log(error)
//       }
//     }
//     getUserData()
//   }, [])

//   // Get all user preferences

//   useEffect(() => {
//     const getallUsersAndTheirLikes = async () => {
//       try {
//         const { data } = await axios.get(`${API_URL}/preferences/all`)
//         console.log('alluserPreference data', data)
//         setallUsersAndTheirLikes(data)
//       } catch (error) {
//         console.log(error)
//       }
//     }
//     getallUsersAndTheirLikes()
//   }, [])

//   const handleFieldChange = (event, index) => {
//     let addUsername = [...watchWith]
//     addUsername[index] = event.target.value
//     setWatchWith(addUsername)
//   }

//   const addMoreUsernames = (event, index) => {
//     console.log('watchWith', watchWith)
//     if(Object.values(watchWith)){
//       console.log(Object.values) 
//     } else{
//     let newUsername = ''
//     setWatchWith([...watchWith, newUsername])
//     }
//   }

//   const removeUsernames = (index) => {
//     let deleteUsername = [...watchWith]
//     deleteUsername.splice(index, 1)
//     setWatchWith(deleteUsername)
// }

//   const handleSubmit = (event) => {
//     event.preventDefault()
//     console.log('this button will navigate, but for now it console logs')
//   }

//   console.log(watchWith)


//   // ! JSX

// return (
//   <>
//     <h1> landed at Match </h1>
//     <div className='dynamicForm'>
//       <form onSubmit={handleSubmit}>
//         {watchWith.map((item,index) => {
//           return(
//             <div key={index}>
//               <input 
//                 name='username' 
//                 placeholder ='UserName' 
//                 value={this.state.value} 
//                 onChange={handleFieldChange(index)}
//                 />
//                 {/* {index !== 0 &&  */}
//                 {index !==0 && <button name="removeUsers" onClick={() => removeUsernames(index)}> Remove This User </button>}
//                 {/* } */}
//             </div>
//           )
//         })}
//       </form>
//       <button name="Submit" onClick={handleSubmit} >Match With A Friend</button>
//       <button name="addUsers" onClick={addMoreUsernames}> Add More Users To Watch With </button>
//     </div>   
//   </>
// )
// }


// function BasicExample() {
//   return (
//     <Dropdown>
//       <Dropdown.Toggle variant="success" id="dropdown-basic">
//         Dropdown Button
//       </Dropdown.Toggle>

//       <Dropdown.Menu>
//         <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
//         <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
//         <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
//       </Dropdown.Menu>
//     </Dropdown>
//   );
// }

// export default BasicExample;