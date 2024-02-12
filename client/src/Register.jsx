import React, { useState } from 'react';
import './AuthForms.css'; 
import './Register.css';
import './App.css'
import axios from 'axios'; 
import Alert from './Alert'; 
import video from './Assets/video.mp4'
import logo from './Assets/logo.png'
import { FaUserShield } from 'react-icons/fa'
import { BsFillShieldLockFill } from 'react-icons/bs'
import { AiOutlineSwapRight } from 'react-icons/ai'
import { MdMarkEmailRead } from 'react-icons/md'

const Register = ({ onToggle, onRegistrationSuccess }) => {
  const [registerData, setRegisterData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  const validateRegisterForm = () => {
    let valid = true;
    const newErrors = {};

    if (!registerData.username) {
      newErrors.username = 'Username is required';
      valid = false;
    }

    if (!registerData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registerData.email)) {
      newErrors.email = 'Invalid email address';
      valid = false;
    }

    if (!registerData.password) {
      newErrors.password = 'Password is required';
      valid = false;
    }

    if (registerData.password !== registerData.confirmPassword) {
      newErrors.confirmPassword = "Passwords don't match";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData({ ...registerData, [name]: value });
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    if (validateRegisterForm()) {
      try {
        const response = await axios.post('https://mern-guvi-8jpd.onrender.com/register', registerData);
        console.log('Registration successful:', response.data);
        onRegistrationSuccess();
      } catch (error) {
        console.error('Registration failed:', error.response.data);
        setErrorMessage('Registration failed. Please try again.'); 
      }
    }
  };

  return (
    <div className="registerPage flex">
    <div className="container flex">

        <div className="videoDiv">
            <video src={video} autoPlay muted loop></video>

            

            <div className="footerDiv flex">
                <span className="text">Have an account?</span>
                <p>
  <button  className='btn flex' onClick={() => onToggle('login')}>
    Login
  </button>
</p>
                        
            </div>
        </div>

        <div className="formDiv flex">
            <div className="headerDiv">
                <img src={logo} alt="Logo Image" />
                <h3>Let Us Know You!</h3>
                
            </div>
            <form action="" className="form grid" onSubmit={handleRegisterSubmit}>
            <div className="inputDiv">
                            <label htmlFor="username">Username</label>
                            <div className="input flex">
                                <FaUserShield className="icon" />
                                <input type="text" id='username' placeholder='Enter Username' name="username" value={registerData.username} onChange={handleRegisterChange} />
                            </div>
                            {errors.username && <p className="error-message">{errors.username}</p>}
                        </div>


                        <div className="inputDiv">
                            <label htmlFor="email">Email</label>
                            <div className="input flex">
                                <MdMarkEmailRead className="icon" />
                          
                                <input type="email" id='email' placeholder='Enter Email' name="email" value={registerData.email} onChange={handleRegisterChange} />
                            </div>
                            {errors.email && <p className="error-message">{errors.email}</p>}
                        </div>            

                        <div className="inputDiv">
                            <label htmlFor="password">Password</label>
                            <div className="input flex">
                                <BsFillShieldLockFill className="icon" />   
                            <input type="password" id='password' placeholder='Enter Password' name="password" value={registerData.password} onChange={handleRegisterChange} />
                            </div>
                            {errors.password && <p className="error-message">{errors.password}</p>}
                        </div>
        
                        <div className="inputDiv">
                            <label htmlFor="password">Confirm Password</label>
                            <div className="input flex">
                                <BsFillShieldLockFill className="icon" />
                                <input
            type="password" id='Confirmpassword' placeholder='Enter Password'
            name="confirmPassword"
            value={registerData.confirmPassword}
            onChange={handleRegisterChange}
          />
                            </div>
                            {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
                        </div>
        

                        <button type='submit' className='btn flex'>
                            <span>Register</span>
                            <AiOutlineSwapRight className="icon" />
                        </button>
                        {errorMessage && <Alert message={errorMessage} />} {/* Display alert if error message exists */}
      </form>
      </div>
      </div>
      </div>
  );
};

export default Register;
