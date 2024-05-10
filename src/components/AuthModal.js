import React, { useState } from 'react';
import './StartModal.css';
import { useAuth } from '../AuthContext';
const AuthModal = (props) => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
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

    const API_URL = 'http://localhost:5001/login';

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
      login(data.user); 
      console.log(data); // Handle success response
      // Optionally, you can handle success response such as redirecting the user or showing a success message.
      setSuccess(true); // Set success state to true
      setError(''); // Clear any previous error messages
      setTimeout(() => {
        props.CloseModal(); // Close the modal after a delay
      }, 2000); // Close the modal after 2 seconds
    } catch (error) {
      console.error('There was a problem with your fetch operation:', error);
      setError('Failed to login. Please check your credentials and try again.'); // Set error message
    }
  };

  return (
    <div className="startmodal">
      <div className='startmodal-top'>
        <img src="/img/Arrow-Reg.png" onClick={props.GoBack}  alt="Arrow Icon"/>
        <p className='skip-button' onClick={props.CloseModal}>SKIP</p>
      </div>
      <div className="startmodal-body">
        <div className="startmodal-left">
          <img src="/img/player.png" alt="Player Image"/>
        </div>
        <div className="startmodal-right">
          <img className='logo-reg' src="/img/Logo Reg.png" alt="Logo Image"/>
          <h1>USER LOGIN</h1>
          <h2>Enter your username, email, and password here to register.</h2>
          {success ? ( // Render success message if success is true
            <p className="success">Authorization successful!</p>
          ) : (
            <form onSubmit={handleSubmit}>
              <input className='regInput' name="username" type="text" placeholder="Username" onChange={handleChange} value={formData.username} required />
              <input className='regInput' name="email" type="email" placeholder="Email" onChange={handleChange} value={formData.email} required />
              <input className='regInput' name="password" type="password" placeholder="Password" onChange={handleChange} value={formData.password} required />
              {error && <p className="error">{error}</p>} {/* Display error message if there's an error */}
              <button type="submit" className='sign-button'>SIGN IN</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default AuthModal;
