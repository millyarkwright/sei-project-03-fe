import { Link } from "react-router-dom"

const Homepage = () => {

   const navButtons = [
    {
      buttonName: "Home", 
      path: "/"
    }, 
    {
      buttonName: "Log In", 
      path: "/login"
    }, 
    {
      buttonName: "Register", 
      path: "/register"
    }, 
    {
      buttonName: "About", 
      path: "/about"
    }
   ]

  return (<>
    <h1>Homepage</h1>
    {navButtons.map((option, index) => {
      return (<Link to={option.path} key={index}>
        {option.buttonName}
      </Link>)      
    })}
  </>)
}

export default Homepage