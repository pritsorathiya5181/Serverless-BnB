import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import './App.css'
import Chatbot from './components/ChatBot'
import Orders from './components/Orders'
import LoginPage from './pages/authentication/login/LoginPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/chatbot' element={<Chatbot />} />
        <Route path='/orders' element={<Orders />} />
      </Routes>
    </Router>
  )
}

export default App
