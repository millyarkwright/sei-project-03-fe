import logo from './logo.svg'
import './App.css'
import Homepage from './components/Homepage'
import { BrowserRouter, Routes, Route } from "react-router-dom"


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element= {<Homepage/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
