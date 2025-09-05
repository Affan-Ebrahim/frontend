import React, { useState } from 'react';
import '../styles/LoginSignup.css';
import profile_icon from '../assets/profile.png';
import password_icon from '../assets/password.png';
import { Link } from 'react-router-dom';

const Login = ({ onLogin }) => { 

  const [formData, setFormData] = useState({ //represents all input fields in login form, initlazises state of formdata
    userName: '',
    password: ''
  });

  const handleChange = (e) => { // arrow function to handle input changes
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => { // arrow function to handle form submission
    e.preventDefault(); // stops the default form submission behavior

    try{
      const response = await fetch('http://localhost:8080/user/login', {
        method: 'POST', // specifys this is a POST request
        headers: { 'Content-Type': 'application/json' }, // tells server that request body is JSON
        body: JSON.stringify(formData) // converts formData to JSON string
      })

      if (response.ok) {
        const user = await response.json();
        onLogin(user); // calls the onLogin prop function with the user data
      }else{
        alert("Invalid credentials. Please try again.");
      }

    }
    catch(error){
      console.error('Login failed:', error);
      alert('Login failed. Please check your credentials and try again.');
    }
  };


  return (
    <div className="container">
      <div className="header"> 
        <div className='text'>Auto-Ticket</div> 
        <div className='underline'></div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="inputs">
          <div className="input">
            <img src={profile_icon} alt="profile_icon"/>
            <input 
              type="text" 
              name="userName"
              placeholder="User Name"
              value={formData.userName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input">
            <img src={password_icon} alt=""/>
            <input 
              type="password" 
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        
        <div className='submit-container' style={{justifyContent: 'center'}}>
          <button type="submit" className="submit">Login</button>
        </div>
        
        <div className="switch-form">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
