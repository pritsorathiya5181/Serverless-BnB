import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import './App.css'
import Chatbot from './components/ChatBot'
import LoginPage from './pages/authentication/login/LoginPage'
// import Room from './components/Room'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/chatbot' element={<Chatbot />} />
        {/* <Route path='/room' element={<Room />} /> */}
      </Routes>
    </Router>
  )
}

export default App
