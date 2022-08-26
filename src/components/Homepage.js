import { Link } from "react-router-dom"
import { Container } from "react-bootstrap"
// import {useState, useEffect} from 'react'
// import { Navigate, useNavigate } from 'react-router-dom'
// import { API_URL } from "../config.js"
// import axios from 'axios'

const Homepage = () => {

  return (<>
    <main>   
      <div className="homepage-text">
        <h1 className="watchit-title" >Watchit</h1>
        <h2>Decide What To Watch With Friends</h2>
        <p>For our SEI 65 project 3, we decided to create an app that allows you to swipe on movies and connect with your friends to avoid the time-consuming task of trying to pick a movie that everyone likes. </p>
        <h3>What’s the problem? </h3>
        <p>We’ve all been there – you have some friends over, or maybe you have a chill weekend evening with your significant other, or you want to watch something new with your family, but nobody can agree on something that everyone would like to watch. It could be a movie, TV series or a documentary.
        <br/>
        The task of deciding what to watch can take up lot of time and ruin the moment.</p>
        <h3>How does Watchit solve this problem? </h3>
        <p>With Watchit, you and movie mates can create an account, swipe on movies and in the end, we will show you only the movies that everyone fancied. </p>
        <p>This way you can go straight to enjoying whatever you liked the look of and never fear movie picking ever again.</p>
      </div> 
  </main>
  </>)
}

export default Homepage