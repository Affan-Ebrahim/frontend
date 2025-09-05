import React, { useState } from 'react';
import '../styles/LoginSignup.css';
import user_icon from '../assets/person.png';
import email_icon from '../assets/email.png';
import password_icon from '../assets/password.png';
import calender_icon from '../assets/calendar.png';
import phone_icon from '../assets/phone.png';
import profile_icon from '../assets/profile.png';
import gender_icon from '../assets/gender.png';
import { Link } from 'react-router-dom';

const Signup = ({ onLogin }) => { 
  // Defines a Signup component with state for all the form fields. As the user types,
  // formData will hold the latest values, and setFormData will update them.
  const [formData, setFormData] = useState({ //represents all input fields in signup form, initlazises state of formdata
    name: '',
    contactNumber: '',
    dob: '',
    gender: '',
    userName: '',
    email: '',
    password: ''
  });

  // arrow function to handle input changes
  // e respresents the event object
  // it updates the formData state with the new value for the changed input field
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => { // arrow function to handle form submission
    e.preventDefault(); // stops the default form submission behavior

      
    try {
      // sends a POST request to the backend API to create a new user with the form data
      const response = await fetch('http://localhost:8080/user/signup', {
        method: 'POST', // specifys this is a POST request
        headers: { 'Content-Type': 'application/json' }, // tells server that request body is JSON
        body: JSON.stringify({ // converts formData to JSON string
          name: formData.name,
          contactNumber: formData.contactNumber,
          dob: formData.dob,
          gender: formData.gender,
          userName: formData.userName,
          email: formData.email,
          password: formData.password
        })
      });

      if (!response.ok) {
        throw new Error('Signup failed');
      }

      const data = await response.json(); // parses the JSON response from the server 
      alert('Signup successful! Please log in.');
      console.log('User has signed up:', data);

      // calls method to reroute user after signup
      onLogin();
    } catch (error) {
      console.error(error);
      alert('Signup error: ' + error.message);
    }
  };

  return (
    <div className="container">
      <div className="header"> 
        <div className='text'>Sign Up</div>
        <div className='underline'></div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="inputs">
          <div className="input">
            <img src={user_icon} alt=""/>
            <input 
              type="text" 
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input">
            <img src={phone_icon} alt=""/>
            <input 
              type="tel" 
              name="contactNumber"
              placeholder="Contact Number"
              value={formData.contactNumber}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="input">
            <img src={calender_icon} alt=""/>
            <input 
              type="date" 
              name="dob"
              placeholder="Date of Birth"
              value={formData.dob}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input">
            <img src={gender_icon} alt=""/>
            <input 
              type="text" 
              name="gender"
              placeholder="Gender"
              value={formData.gender}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input">
            <img src={profile_icon} alt=""/>
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
            <img src={email_icon} alt=""/>
            <input 
              type="email" 
              name="email"
              placeholder="Email"
              value={formData.email}
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
        
        <div className='submit-container'>
          <button type="submit" className="submit">Sign Up</button>
        </div>
      </form>

      <div className="switch-form">
        Already have an account? <Link to="/login">Login</Link>
      </div>
    </div>
  );
};

export default Signup;
