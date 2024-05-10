import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Product.css';

const Product = ({ product,accessToken, imgSrc, itemName, condition, price, location,  userId }) => {
  const [imageUrl, setImageUrl] = useState(''); //стейт у якому буде зображення
   const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch('https://api.dropboxapi.com/2/files/search_v2', {
          method: 'POST', // надсилаємо ім'я для отримання картинки, того пост
          headers: { // токен
            'Authorization': `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            query: imgSrc, // у запит передаємо картинку
            options: {
              file_status: 'active',
              filename_only: true,
              max_results: 1,
            },
            match_field_options: {
              include_highlights: false,
            },
          }),
        });

        const data = await response.json(); // записуємо дані картинки отримані за 1 посиланням
        console.log(data)
        if (data.matches.length > 0) { // якщо картинка з таким іменем є, робимо запит на тимчасове посилання
          const path = data.matches[0].metadata.metadata.path_display;
          const linkResponse = await fetch('https://api.dropboxapi.com/2/files/get_temporary_link', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ path }),
          });
 
          const linkData = await linkResponse.json();  // записуємо тимчасове посилання
          console.log(linkData)
          setImageUrl(linkData.link);
        }
      } catch (error) {
        console.error('Error fetching image from Dropbox:', error);
      }
    };

    if (imgSrc) {
      fetchImage(); // викликаємо ф-ю що отримує тимчасове посилання
    }
  }, [imgSrc, accessToken]); // весь юзефект працює за умови що через пропси передали картинку і токен


  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:5001/user/${userId}`);
        const userData = await response.json();
        if (response.ok) {
          setUser(userData);
        } else {
          throw new Error(userData.error || 'Unable to fetch user');
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    if (userId) {
      fetchUser();
    }
  }, [userId]);
  return (
    <div className='item'>
      <Link to={{ pathname: `/product/${itemName}` }}> 
        <img className="item-img" src={imageUrl || './img/placeholder.png'} alt={itemName} />
      </Link>
      <div className='item-section-one'>
        <div className='item-section-two'>
          <div>
            <h4 className='item-name'>{itemName}</h4>
            <p className='state'>{condition}</p>
          </div>
          <p className='price'>{price}$</p>
        </div>
        <div className='location-descr'>
          <img src="./img/location.png" alt="Location"/>
          <p>{location}</p>
        </div>
      </div>
    </div>
  );
}

export default Product;
