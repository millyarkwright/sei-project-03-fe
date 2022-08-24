import {useState, useEffect} from 'react'
const Match = () => {

  // const [error, setError] = useState('')

  const [watchWith, setWatchWith] = useState( [{ username: '' }])

  const handleButtonClick = (event) => {
    event.preventDefault()
    console.log('this button will navigate, but for now it console logs')  }
  
  const handleFieldChange = (count, event) => {
    const addUsername = [...watchWith]
    addUsername[count] = event.target.value
    setWatchWith(addUsername)
  }

  const addMoreUsernames = () => {
    const newUsername = {username: ''}
    setWatchWith([...watchWith, newUsername])
  }

  const removeUsernames = (count) => {
    const deleteUsername = [...watchWith]
    deleteUsername.splice(count, 1)
    setWatchWith(deleteUsername)
}

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log('this button will navigate, but for now it console logs')
  }

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
                placeholder ='User Name' 
                value ={input.username} 
                onChange={event => handleFieldChange(event, count)}
                />
                <button name="removeUsers" onClick={() => removeUsernames(count)}> Remove This User </button>
            </div>
          )
        })}
      </form>
      <button name="Submit" onClick={handleButtonClick} >Match With A Friend</button>
      <button name="addUsers" onClick={addMoreUsernames}> Add More Users To Watch With </button>
    </div>   
  </>
)
}

export default Match