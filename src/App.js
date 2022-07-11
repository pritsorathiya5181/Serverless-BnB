import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import Chatbot from './components/ChatBot'
import Orders from './components/Orders'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Homepage from './pages/homepage'
import Login from './pages/login'
import Signup from './pages/signup'
import Forgot from './pages/forgot'
import Reset from './pages/reset'
import NotFound from './pages/404'
import Security from './pages/security';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useState, useEffect, useSearchParams } from 'react'
import { Auth } from 'aws-amplify'
import CaesarCipher from './pages/caesarCipher'

function App() {
  const [state, setState] = useState({
    isAuthenticated: false,
    user: null,
  })

  const setAuthStatus = (authenticated) => {
    setState({ ...state, isAuthenticated: authenticated })
  }

  const setUser = (user) => {
    setState({ ...state, user: user })
  }

  useEffect(() => {
    async function fetchSession() {
      try {
        const session = await Auth.currentSession()
        setAuthStatus(true)
        console.log(session)
        const user = await Auth.currentAuthenticatedUser()
        setUser(user)
      } catch (error) {
        if (error !== 'No current user') {
          console.log(error)
        }
      }
    }
    fetchSession()
  }, [])

  const authProps = {
    isAuthenticated: state.isAuthenticated,
    user: state.user,
    setAuthStatus: setAuthStatus,
    setUser: setUser,
  }
  return (
    <Router>
      <div className='min-h-screen flex flex-col'>
        <Navbar auth={authProps} />
        <div className='flex-1 sm:px-32 px-12 py-12 bg-gray-50'>
          <Routes>
            <Route exact path='/' element={<Login auth={authProps} />} />
            <Route path='/login' element={<Login auth={authProps} />} />
            <Route path='/signup' element={<Signup auth={authProps} />} />
            <Route path='/home' element={<Homepage auth={authProps} />} />
            <Route path='/forgot' element={<Forgot auth={authProps} />} />
            <Route path='/reset' element={<Reset auth={authProps} />} />
            <Route path='/security' element={<Security auth={authProps} />} />
            <Route path='*' element={<NotFound />} />
            <Route
              path='/caesarcipher'
              element={<CaesarCipher auth={authProps} />}
            />
            <Route path='/chatbot' element={<Chatbot auth={authProps} />} />
            <Route path='/orders' element={<Orders auth={authProps} />} />
          </Routes>
        </div>
        <ToastContainer />
        <Footer />
      </div>
    </Router>
  )
}

export default App
