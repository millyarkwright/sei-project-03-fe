import {useState, useEffect} from 'react'
import { API_URL } from "../../config.js"
import axios from 'axios'

const Match = () => {

  // const [error, setError] = useState('')

  const [watchWith, setWatchWith] = useState( [{ username: '' }])
  const [userData, setUserData] = useState([])
  const [error, setError] = useState([])


  const handleFieldChange = (event, count) => {
    let addUsername = [...watchWith]
    addUsername[count] = event.target.value
    setWatchWith(addUsername)
  }

  const addMoreUsernames = () => {
    console.log('watchWith', watchWith)
    console.log('Object.values(watchWith)', Object.values(watchWith))
    console.log('Object.values(watchWith).slice(-1)', Object.values(Object.values(watchWith).slice(-1)))
    console.log('Object.values(watchWith).slice(-1) === false', Object.values(Object.values(watchWith).slice(-1) === false))
    let newUsername = {username: ''}
    setWatchWith([...watchWith, newUsername])
  }

  const removeUsernames = (count) => {
    let deleteUsername = [...watchWith]
    deleteUsername.splice(count, 1)
    setWatchWith(deleteUsername)
}

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log('this button will navigate, but for now it console logs')
  }

  console.log(watchWith)

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



  // ! JSX

return (
  <>
    <h1> landed at Match </h1>
    <div className='dynamicForm'>
      <form onSubmit={handleSubmit}>
        {watchWith.map((input, count) => {
          return(
            <div key={count}>
              <input 
                name='username' 
                placeholder ='UserName' 
                value ={input.username} 
                onChange={event => handleFieldChange(event, count)}
                />
                {/* {count !== 0 &&  */}
                {count !==0 && <button name="removeUsers" onClick={() => removeUsernames(count)}> Remove This User </button>}
                {/* } */}
            </div>
          )
        })}
      </form>
      <button name="Submit" onClick={handleSubmit} >Match With A Friend</button>
      <button name="addUsers" onClick={addMoreUsernames}> Add More Users To Watch With </button>
    </div>   
  </>
)
}

export default Match