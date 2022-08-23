import logo from './logo.svg'
import PageNavBar from './components/PageNavBar'
import Homepage from './components/Homepage'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Dashboard from './components/Dashboard'
import StickyFooterBar from './components/StickyFooterBar'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import MovieInfo from './components/movies/MovieInfo'
import MovieSwiping from './components/MovieSwiping'
import Match from './components/movies/MovieMatch'

function App() {
  return (
    <>
      <div className="App">
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
          </Routes>
        </BrowserRouter>
      </div>
      <StickyFooterBar></StickyFooterBar>
    </>
  )
}

export default App
