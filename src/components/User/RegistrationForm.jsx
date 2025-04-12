// RegistrationForm.jsx
import React, { useState } from 'react';
import './RegistrationForm.css';
import axios from "axios"
import { useNavigate } from 'react-router-dom';



const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  
  let navigator= useNavigate()
  const [showPassword, setShowPassword] = useState(false);
  
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

 
 
      
     
  

  const validate = () => {
    let tempErrors = {};
    if (!formData.username) tempErrors.username = 'Username is required';
    if (!formData.email) {
      tempErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      tempErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      tempErrors.password = 'Password must be at least 6 characters';
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      axios.post("http://localhost:3000/User",formData).then(r=>alert("Registration successful!"))

      console.log('Form Data Submitted:', formData);
    
      setFormData({ username: '', email: '', password: '' });
      navigator('/login')
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="registration-form">
        <h2>Create Account</h2>

        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          {errors.username && <p className="error-text">{errors.username}</p>}
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error-text">{errors.email}</p>}
        </div>

          <div className="form-group">
           <label>Password</label>
          <div className="password-wrapper">
           <input
          type={showPassword ? 'text' : 'password'}
          name="password"
          value={formData.password}
          onChange={handleChange}
          />
              <button type="button" className="toggle-pass" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? '🙈' : '👁️'}
              </button>
                </div>
             {errors.password && <p className="error-text">{errors.password}</p>}
           </div>


        <button type="submit" className="btn-submit">Register</button>
      </form>
    </div>
  );
};

export default RegistrationForm;
