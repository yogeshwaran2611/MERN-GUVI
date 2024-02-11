import React, { useState } from 'react';
import './AuthForms.css';
import './Login.css';
import './App.css'; 
import axios from 'axios'; 
import video from './Assets/video.mp4'
import logo from './Assets/logo.png'
import { FaUserShield } from 'react-icons/fa'
import { BsFillShieldLockFill } from 'react-icons/bs'
import { AiOutlineSwapRight } from 'react-icons/ai'


const Login = ({ onLogin, onToggle }) => {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const validateLoginForm = () => {
    let valid = true;
    const newErrors = {};

    if (!loginData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginData.email)) {
      newErrors.email = 'Invalid email address';
      valid = false;
    }

    if (!loginData.password) {
      newErrors.password = 'Password is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
  
    if (validateLoginForm()) {
      try {
        const response = await axios.post('https://mern-guvi-8jpd.onrender.com/login', loginData);

        console.log('Login successful:', response.data);
        setSuccessMessage('Login successful');
        setErrorMessage('');
        onLogin(response.data.user);
      } catch (error) {
        console.error('Login failed:', error.response.data);
        setSuccessMessage('');
        if (error.response.status === 401) {
          setErrorMessage('Credentials not matched. Please check your email and password.');
        } else if (error.response.status === 400) {
          setErrorMessage('Please enter both email and password.');
        } else {
          setErrorMessage(`An error ${error} occurred while logging in. Please try again later.`);
        }
      }
      
    }
  };
  

  return (
    <div className="loginPage flex">
            <div className="container flex">

                <div className="videoDiv">
                    <video src={video} autoPlay muted loop></video>

                    

                    <div className="footerDiv flex">
                    <span className="text">Don't have an account?</span>
<p>
  <button  className='btn flex' onClick={() => onToggle('register')}>
    Register
  </button>
</p>
                        
                    </div>
                </div>

                <div className="formDiv flex">
                    <div className="headerDiv">
                        <img src={logo} alt="Logo Image" />
                        <h3>Welcome Back!</h3>
                    </div>

        <form action="" className="form grid" onSubmit={handleLoginSubmit}>
          
          <div className="inputDiv">
                            <label htmlFor="email">Email</label>
                            <div className="input flex">
                                <FaUserShield className="icon" />
                                <input type="email" id='username' placeholder='Enter Username' name="email" value={loginData.email} onChange={handleLoginChange} />
                            </div>
                            {errors.email && <p className="error-message">{errors.email}</p>}
                        </div>
          
          
                        <div className="inputDiv">
                            <label htmlFor="password">Password</label>
                            <div className="input flex">
                                <BsFillShieldLockFill className="icon" />
                                <input type="password" id='password' placeholder='Enter Password' name="password" value={loginData.password} onChange={handleLoginChange} />
                            </div>
                            {errors.password && <p className="error-message">{errors.password}</p>}
                        </div>
          <br />
          {successMessage && <p className="success-message">{successMessage}</p>}
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          
          <button type='submit' className='btn flex'>
                            <span>Login</span>
                            <AiOutlineSwapRight className="icon" />
                        </button>
        </form>
      </div>
      
    </div>
    </div>
  );
};

export default Login;
