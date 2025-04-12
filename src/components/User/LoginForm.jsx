// components/LoginForm.jsx
import React, { useState } from 'react';
import './LoginForm.css';
import axios from "axios"
import { useNavigate } from 'react-router-dom';


const LoginForm = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [Apidata, setApi] = useState([]);
  const navigator= useNavigate()
 

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const validate = () => {
    let errs = {};
    if (!formData.email) errs.email = 'Email is required';
    if (!formData.password) errs.password = 'Password is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      axios.get("http://localhost:3000/User").then(res =>{setApi(res.data)})

      Apidata.map((key)=>{
        if(key.email==formData.email && key.password==formData.password){
            alert('Logged in successfully!');
            console.log(key);
            navigator('/')
        }
      })

    }
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <h2>Login</h2>

        <div className="form-group">
          <label>Email</label>
          <input name="email" value={formData.email} onChange={handleChange} />
          {errors.email && <p className="error-text">{errors.email}</p>}
        </div>

        <div className="form-group">
          <label>Password</label>
          <div className="password-wrapper">
            <input
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleChange}
            />
            <button type="button" className="toggle-pass" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>
          {errors.password && <p className="error-text">{errors.password}</p>}
        </div>

        <button className="btn-submit" type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
