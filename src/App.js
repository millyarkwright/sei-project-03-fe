import logo from './logo.svg'

import { BrowserRouter, Routes, Route } from "react-router-dom"
import axios from 'axios'
import { useEffect } from 'react'

import PageNavBar from './components/PageNavBar'
import Homepage from './components/Homepage'
import Dashboard from './components/Dashboard'
import StickyFooterBar from './components/StickyFooterBar'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import MovieInfo from './components/movies/MovieInfo'
import MovieSwiping from './components/MovieSwiping'
import Match from './components/movies/MovieMatch'
import ProfilePage from './components/ProfilePage'



function App() {

  useEffect(() => {
    // if localstorage token exists, set axios default headers to token, if not, set to null
    const token = localStorage.getItem('token')
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
    } else {
      axios.defaults.headers.common["Authorization"] = null
    }
  }, [])

  return (
    <>
      <div className="site-wrapper">
        <BrowserRouter>
          <PageNavBar/>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/movies/:movieId" element={<MovieInfo />} />
            <Route path="/login" element={<Login></Login>}></Route>
            <Route path="/register" element={<Register></Register>}></Route>
            <Route path="/swipe" element={<MovieSwiping></MovieSwiping>}></Route>
            <Route path="/match" element={<Match></Match>}></Route>
            <Route path="/profile" element={<ProfilePage></ProfilePage>}></Route>
          </Routes>
        </BrowserRouter>
        <StickyFooterBar></StickyFooterBar>
      </div>
    </>
  )
}

export default App
