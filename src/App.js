import logo from './logo.svg'
import './App.css'
import Homepage from './components/Homepage'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Dashboard from './components/Dashboard'
import StickyFooterBar from './components/StickyFooterBar'
import Login from './components/Login'
import Register from './components/Register'
import Profile from './components/Profile'

function App() {
  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Homepage />}></Route>
            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route path="/login" element={<Login></Login>}></Route>
            <Route path="/register" element={<Register></Register>}></Route>
            <Route path="/profile/:userId" element={<Profile></Profile>}></Route>
          </Routes>
        </BrowserRouter>
      </div>
      <StickyFooterBar></StickyFooterBar>
    </>
  )
}

export default App
