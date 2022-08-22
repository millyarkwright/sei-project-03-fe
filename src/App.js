import logo from './logo.svg'
// import './App.css'
import Homepage from './components/Homepage'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Dashboard from './components/Dashboard'
import StickyFooterBar from './components/StickyFooterBar'
import MovieInfo from './components/movies/MovieInfo'

function App() {
  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/movies/:movieId" element={<MovieInfo />} />
          </Routes>
        </BrowserRouter>
      </div>
      <StickyFooterBar></StickyFooterBar>
    </>
  )
}

export default App
