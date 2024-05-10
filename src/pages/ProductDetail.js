import './ProductDetail.css'

import ImageSlider from '../components/ImageSlider';
import { useParams } from "react-router-dom";
import { PRODUCTS } from '../PRODUCTS';
import React, { useState, useEffect } from "react";
import Description from '../components/Description';
import OrderSubmitForm from '../components/OrderSubmitForm';
import PhoneNumber from '../components/PhoneNumber';
import Modal from '../components/Modal';

function ProductDetail() {  
  const [products, setProducts] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [user, setUser] = useState(null); // State to store user data
  const { productName } = useParams();
  const [isPhoneModalVisible, setIsPhoneModalVisible] = useState(false);
  const handleShowModal = () => {
    setIsModalVisible(true);
  };

  const handleHideModal = () => {
    setIsModalVisible(false);
  };
  const handleShowPhoneModal = () => {
    setIsPhoneModalVisible(true);
  };

  const handleHidePhoneModal = () => {
    setIsPhoneModalVisible(false);
  };

  const handleSubmitForm = (event) => {
    event.preventDefault();
    console.log("Form submitted!");
    handleHideModal();
  };
  const fetchUserById = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5001/user/${userId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const userData = await response.json();
      setUser(userData);
      console.log(userData);
    } catch (error) {
      console.error("Failed to fetch user:", error);
    }
  };
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5001/product');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data);
        console.log(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      const foundProduct = products.find(product => product.name === productName);
      if (foundProduct && foundProduct.user) {
        fetchUserById(foundProduct.user);
      }
    }
  }, [products, productName]);

  const foundProduct = products.find(product => product.name === productName);
  console.log(foundProduct);

  return (
    <div className="item-detail">
      <div className="item-block">
        {/* Add conditional rendering for ImageSlider */}
        {foundProduct && foundProduct.imageUrls && (
          <ImageSlider
            images={foundProduct.imageUrls}
            accessToken={`${process.env.REACT_APP_ACCESS_TOKEN}`}
              />
        )}
         {foundProduct && (
        <Description product={foundProduct} handleShowPhoneModal={handleShowPhoneModal} handleShowModal={handleShowModal} />)}
        {isModalVisible && (
          <Modal onHideModal={handleHideModal} >
            <div>
              <OrderSubmitForm />
            </div>
          </Modal>
        )}
        {isPhoneModalVisible &&user && (
          <Modal onHideModal={handleHidePhoneModal}>
            <div>
              <PhoneNumber phone={user.phone}/>
            </div>
          </Modal>
        )}
        
      </div>
    </div>
  );
}

export default ProductDetail;
