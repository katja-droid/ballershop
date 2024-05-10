import React from 'react';
import './Footer.css'
const Footer = () => {
  return (
    <footer>
      <div className="links-and-logo">
        <img className="logo-footer" src="/img/logo.png" alt="Logo" />
        <div className="footer-sections">
          <div className="footer-l">
            <a href="#">Help</a>
            <a href="#">Privacy Policy</a>
          </div>
          <div className="footer-r">
            <a href="#">Terms and conditions</a>
            <a href="#">Work with us</a>
          </div>
        </div>
      </div>
      <p className="credits">(c) Ballershop LLC 2023</p>
    </footer>
  );
};

export default Footer;
