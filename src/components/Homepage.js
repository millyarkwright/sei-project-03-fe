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
       buttonName: "Dashboard",
       path: "/dashboard"
     }
   ]

  return (<>
    <h1>Homepage</h1>

    {navButtons.map((option, index) => {
      return (<Link to={option.path} key={index}>
        {option.buttonName}
      </Link>)      
    })}


    <div>
      <h2>Text</h2>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reiciendis aut et, a laudantium nihil minus, inventore earum vel magni quos necessitatibus. Odit optio quos, alias eos excepturi repellendus? Laborum, nesciunt.</p>
    </div>
  </>)
}

export default Homepage