import React, { useState } from 'react';
import './Navbar.css';
import Modal from '../components/Modal'; // Assuming you have a Modal component similar to ProductDetail
import ProductForm from './ProductForm';
import { useAuth } from '../AuthContext';

const Navbar = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { user, logout } = useAuth(); //підключаємо контекст

  const handleShowModal = () => {
    setIsModalVisible(true);
  };

  const handleHideModal = () => {
    setIsModalVisible(false);
  };

  return (
    <nav>
      <img className="logo" src="/img/logo.png" alt="Logo"/>

      {/*  рендеримо цей блок лише за умови авторизації */}
      <div className="right">
        {user && (
          <React.Fragment>
            <button className="add" onClick={handleShowModal}>ADD AN ITEM</button>
            <p className="profile-name">{user.username}</p>
          </React.Fragment>
        )}
        {user && <img className="profile" src="/img/profile-icon.png" alt="Profile" onClick={logout} />}
      </div>

      {isModalVisible && (
        <Modal onHideModal={handleHideModal}>
          <ProductForm/>
        </Modal>
      )}
    </nav>
  );
}

export default Navbar;
