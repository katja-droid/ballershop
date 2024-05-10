import './ProductDetail.css'

import ImageSlider from '../components/ImageSlider';
import { useParams } from "react-router-dom";
import { PRODUCTS } from '../PRODUCTS';
import React, { useEffect, useState } from "react";
import Description from '../components/Description';
import Modal from '../components/Modal';
import OrderSubmitForm from '../components/OrderSubmitForm';

function ProductDetail() {  
  const { productName } = useParams();
  const [products, setProducts] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleShowModal = () => {
    setIsModalVisible(true);
  }
  const handleHideModal = () => {
    setIsModalVisible(false);
  }
  useEffect(() => {
    const fetchProducts = async () => {
      try{
        const response = await fetch('http://localhost:5001/product');
        if(!response.ok){
          throw new Error(`HTTP ERROR! status: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data);
        console.log(data);
      } catch(error){
           console.error("failed to fetch products:", error);
      }
    };
    fetchProducts();
  }, [])
  useEffect(() => {
    if(products.length > 0){
      const foundProduct = products.find(product => product.name === productName);
    }
  }, [products, productName]);
  const foundProduct = products.find(product => product.name === productName);
  console.log(foundProduct);
    return (
      
      <div className="item-detail">
        <div className="item-block">
        {foundProduct &&(< ImageSlider images ={foundProduct.imageUrls} ></ImageSlider>)}
        
       {foundProduct && (<Description product ={foundProduct} handleShowModal={handleShowModal}></Description>)}
       {isModalVisible &&foundProduct&&(
        <Modal onHideModal = {handleHideModal}>
          <div>
            <OrderSubmitForm></OrderSubmitForm>
          </div>
        </Modal>
       )}
       </div>
      </div>
    );
  }
  
  export default ProductDetail;