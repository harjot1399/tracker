import logo from './logo.svg';
import './App.css';
import HomePage from './pages/homePage';
import { LoginPage } from './pages/loginPage';
import { SignUpPage } from './pages/signupPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from '@mui/icons-material';

function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path = "/" element = {<LoginPage />}/>
          <Route path = "/home" element = {<HomePage />}/>
          <Route path = "/signup" element = {<SignUpPage />}/>

        </Routes>
      </Router>

    </div>

  );
}

export default App;
