import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from "./Header.js";
import Footer from "./Footer.js";
import Navbar from './Navbar.js';
import Modal from './Modal.js'; // Import the Modal component
import StartModal from './StartModal.js';
import RegModal from './RegModal.js';
import AuthModal from './AuthModal.js';
import { AuthProvider } from '../AuthContext';
function Layout() {
  // State to control the visibility of the modal
  const [isModalActive, setIsModalActive] = useState(true);
  const [isRegModalActive, setIsRegModalActive] = useState(false);
  const [isSignModalActive, setIsSignModalActive] = useState(false);
  return (
    <AuthProvider>
    <div className="app">
      <Navbar />
      <Header />
      <Outlet />
      {isModalActive && (
        <Modal  modalStyle={{ backgroundColor: '#B336FF' }}  onHideModal={() => {setIsModalActive(false);}}>
          <StartModal  CloseModal={() => {setIsModalActive(false);}} OpenSign={()=>{setIsSignModalActive(true); setIsModalActive(false);}} OpenReg={()=>{setIsRegModalActive(true); setIsModalActive(false);}} ></StartModal>
        </Modal>
      )}
         {isRegModalActive && (
        <Modal  modalStyle={{ backgroundColor: '#B336FF' }}  onHideModal={() => {setIsRegModalActive(false); }}>
         <RegModal GoBack={() => {setIsModalActive(true); setIsRegModalActive(false);}} CloseModal={() => {setIsRegModalActive(false);} }/>  </Modal>
      )}
         {isSignModalActive && (
        <Modal  modalStyle={{ backgroundColor: '#B336FF' }}  onHideModal={() => {setIsSignModalActive(false); setIsModalActive(false);}}>
         <AuthModal GoBack={() => {setIsModalActive(true); setIsSignModalActive(false);}}  CloseModal={() => {setIsSignModalActive(false);} }/>  </Modal>
      )}
      <Footer />
    </div>
    </AuthProvider>
  );
}

export default Layout;
