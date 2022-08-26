import { BrowserRouter, Routes, Route } from "react-router-dom"
import axios from 'axios'
import { useEffect } from 'react'
import PageNavBar from './components/PageNavBar'
import StickyFooterBar from './components/StickyFooterBar'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import MovieInfo from './components/movies/MovieInfo'
import MovieSwiping from './components/MovieSwiping'
import Match from './components/movies/MovieMatch'
import ProfilePage from './components/ProfilePage'
import NotFoundPage from './components/NotFoundPage'
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
            <Route path="/" element={<Match />} />
            <Route path="/movies/:movieId" element={<MovieInfo />} />
            <Route path="/login" element={<Login></Login>}></Route>
            <Route path="/register" element={<Register></Register>}></Route>
            <Route path="/swipe" element={<MovieSwiping></MovieSwiping>}></Route>
            <Route path="/match" element={<Match></Match>}></Route>
            <Route path="/profile" element={<ProfilePage></ProfilePage>}></Route>
            <Route path="*" element={<NotFoundPage></NotFoundPage>}></Route>
          </Routes>
        </BrowserRouter>
        <StickyFooterBar></StickyFooterBar>
      </div>
    </>
  )
}
export default App
