import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './StartModal.css';

const RegModal = (props) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    repeatPassword: '',
    phone: '' // ДОДАВСЯ ТЕЛЕФОН
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (formData.password !== formData.repeatPassword) {
      setError('Passwords do not match');
      return;
    }
  
    const API_URL = 'http://localhost:5001/register'; // Replace with your actual API URL
  
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) throw new Error('Network response was not ok.');
  
      const data = await response.json();
      console.log(data);
      // Optionally, you can handle success response such as redirecting the user or showing a success message.
      setSuccess(true); // Set success state to true
    } catch (error) {
      console.error('There was a problem with your fetch operation:', error);
      // Optionally, you can handle error response such as displaying an error message to the user.
    }
  };

  // Render success message if success state is true
  if (success) {
    return (
      <div className="startmodal-success">
        
        <p>You have successfully registered.</p>
      </div>
    );
  }

  return (
    <div className="startmodal">
      <div className='startmodal-top'>
        <img onClick={props.GoBack} src="/img/Arrow-Reg.png"/>
        <p className='skip-button' onClick={props.CloseModal}>SKIP</p>
      </div>
      <div className="startmodal-body">
        <div className="startmodal-left">
          <img src="/img/player.png" alt="Player Image"/>
        </div>
        <div className="startmodal-right">
          <img className='logo-reg' src="/img/Logo Reg.png" alt="Logo Image"/>
          <h1>USER REGISTRATION</h1>
          <h2>Enter your username, email, password, and phone number to register.</h2>
          <form onSubmit={handleSubmit}>
            <input className='regInput' name="username" type="text" placeholder="Username" onChange={handleChange} value={formData.username} required />
            <input className='regInput' name="email" type="email" placeholder="Email" onChange={handleChange} value={formData.email} required />
            <input className='regInput' name="password" type="password" placeholder="Password" onChange={handleChange} value={formData.password} required />
            <input className='regInput' name="repeatPassword" type="password" placeholder="Repeat password" onChange={handleChange} value={formData.repeatPassword} required />
            <input className='regInput' name="phone" type="text" placeholder="Phone" onChange={handleChange} value={formData.phone} required /> 
            {error && <p className="error">{error}</p>}
            <button type="submit" className='sign-button'>SIGN UP WITH EMAIL</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegModal;
