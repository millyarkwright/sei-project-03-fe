// import { useState } from "react"
// import axios from "axios"
// import { Navigate, useNavigate } from "react-router-dom"

// const Login = () => {

//   const navigate = useNavigate()

<<<<<<< HEAD
//   const [userData, setUserData] = useState({username:"", password:""})
=======
  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const [userData, setUserData] = useState({username:"", password:""})
>>>>>>> 4702d3ba89734a396df45ea51e9746f009927992

//   const handleFieldChange = (event) => {
//     setUserData({ ...userData, [event.target.name]: event.target.value })
//   }

<<<<<<< HEAD
//   const handleSubmit = async (event) => {
//     event.preventDefault()

//     try {
//       const response = await axios.post("http://localhost:4500/login", userData)
//       const { token } = response.data
//       localStorage.setItem("token", token)
//       axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
//       navigate("/dashboard")
//     } catch (error) {
//       console.log(error)
//     }
//   }

//   return (
//     <>
//       <h1>Login for your account</h1>
//       <form onSubmit={() => handleSubmit(event)} action="">
//         <input type="text" name="username" placeholder="Your username" value={userData.username} onChange={() => handleFieldChange(event)}/>
//         <input type="password" name="password" placeholder="Your password" value={userData.password} onChange={() => handleFieldChange(event)} />
//         <button type="submit">Log In</button>
//       </form>
//     </>
//   )
// }
=======
  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const response = await axios.post("http://localhost:4500/login", userData)
      const { token } = response.data
      localStorage.setItem("token", token)
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
      navigate("/dashboard")
    } catch (error) {
      setErrorMessage(error.response.data.message)
      setIsError(true)
      console.log(error)
    }
  }

  return (
    <>
      <h1>Login for your account</h1>
      <form onSubmit={() => handleSubmit(event)} action="">
        <input type="text" name="username" placeholder="Your username" value={userData.username} onChange={() => handleFieldChange(event)}/>
        <input type="password" name="password" placeholder="Your password" value={userData.password} onChange={() => handleFieldChange(event)} />
        <button type="submit">Log In</button>
        {isError && errorMessage}
      </form>
    </>
  )
}
>>>>>>> 4702d3ba89734a396df45ea51e9746f009927992

// export default Login