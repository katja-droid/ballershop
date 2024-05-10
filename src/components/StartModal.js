import React from 'react';
import { Link } from 'react-router-dom';
import './StartModal.css';

const StartModal = (props) => {
  return (
    <div className="startmodal">
      <div className='startmodal-top'>
        <img onClick={props.CloseModal} src="/img/Arrow-Reg.png" alt="Arrow Icon" />
        <p className='skip-button' onClick={props.CloseModal}>SKIP</p>
      </div>
      <div className="startmodal-body">
        <div className="startmodal-left">
          <img src="/img/player.png" alt="Player Image" />
        </div>
        <div className="startmodal-right">
          <img className='logo-reg' src="/img/Logo Reg.png" alt="Logo Image" />
          <h1>First marketplace for basketball enthusiasts.</h1>
          <h2>Join us to sell and buy shoes, clothes, merchandise, and more.</h2>
          <button onClick={props.OpenReg} className='sign-button'>SIGN UP WITH EMAIL</button>
          <p className='login-link'>Already have an account? <Link onClick={props.OpenSign} to="#">Sign in here.</Link></p>
        </div>
      </div>
    </div>
  );
}

export default StartModal;
