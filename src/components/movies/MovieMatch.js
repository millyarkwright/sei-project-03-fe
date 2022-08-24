import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { API_URL } from "../../config.js"
import axios from 'axios'

const Match = () => {

  // ! State
  const [userData, setUserData] = useState()
  const [allUserPreferences, setAllUserPreferences] = useState([])
  const [watchWith, setWatchWith] = useState({username: ''})
  const [error, setError] = useState()
  const [userExists, setUserExists] = useState(false)
  const [foundUser, setFoundUser] = useState()
  const [filteredMovies, setFilteredMovies] = useState([])

  console.log('watch with', watchWith)

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
    const getAllUserPreferences = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/preferences/all`)
        console.log('alluserPreference data', data)
        setAllUserPreferences(data)
      } catch (error) {
        console.log(error)
        setError(setError)
      }
    }
    getAllUserPreferences()
  }, [])
  console.log('allUserPreferences', allUserPreferences)


  useEffect(() => {
    foundUser && 
    console.log('reached line 54')
    console.log('userData->', userData)
    console.log('foundUser (useeffect)->', foundUser)
    // const userMoviesLiked = userData.moviesLiked
    // const foundUserMoviesLiked = foundUser.moviesLiked
    // setFilteredMovies(userMoviesLiked.filter((movie) => {
    //   return foundUserMoviesLiked.includes(movie)
    // }))
    // console.log('userData.moviesLiked',  userMoviesLiked)
    // console.log('foundUser.moviesLiked',  foundUserMoviesLiked)
  }, [foundUser])

  // ! Executions

  const handleFieldChange = (event) => {
    const newObj = { ...watchWith, [event.target.name]: event.target.value}
    console.log('newObj', newObj)
    setWatchWith(newObj)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    // ERROR TEST

    const foundUser = allUserPreferences.find(user => user.username === watchWith.username)

    console.log('foundUser (handlesub)->',foundUser)

    foundUser ? setFoundUser(foundUser) : setError({ message: 'please enter a valid username to match with'})

  }


  

  //   const userMoviesLiked = userData.moviesLiked
    // const foundUserMoviesLiked = foundUser.moviesLiked
  // console.log(moviesInCommon)
  console.log(filteredMovies)
  // console.log('allUserPreferences', allUserPreferences)
  // console.log('foundUser->',foundUser)
  // console.log('error', error)



  // ! JSX

return (
  <>
    <h1> landed at Match </h1>
    <div className='form'>
      <form onSubmit={handleSubmit}>
          <input 
            type='text'
            name='username' 
            value={watchWith.username}
            placeholder='Username' 
            onChange={handleFieldChange}>
          </input>
          <input type='submit' value="Match with friend" className='btn w-100'/>
      </form>
    </div>   
    <h2> {error && error.message} </h2>
  </>
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
//     const getAllUserPreferences = async () => {
//       try {
//         const { data } = await axios.get(`${API_URL}/preferences/all`)
//         console.log('alluserPreference data', data)
//         setAllUserPreferences(data)
//       } catch (error) {
//         console.log(error)
//       }
//     }
//     getAllUserPreferences()
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