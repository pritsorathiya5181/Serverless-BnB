import logo from '../../../assets/logo/logo.svg'
import './LoginPageStyle.css'

const LoginPage = () => {
  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>Serverless B&B</p>
        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          Demo Login Screen
        </a>
      </header>
    </div>
  )
}

export default LoginPage
