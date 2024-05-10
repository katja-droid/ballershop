import React, { useEffect, useState } from 'react';
import './Product.css'
import { Link } from 'react-router-dom';
const Product = ({ product,accessToken, imgSrc, itemName, condition, price, location,  userId   }) => {
  const [imageUrl, setImageUrl] = useState('');
  const [user, serUser] = useState(null);
  useEffect(() => {
    const fetchImage  = async () => {
      try{
        const response = await fetch("https://api.dropboxapi.com/2/files/search_v2", {
          method: 'POST',
          headers: {
            'Authorization': `Bearer sl.B0crW9XajRKjmN-eh4o1hruWgkhLfS0pbyP-9UgqAmUoxA_fxjYHrSsyNB_XL-k3iVaiuKsaI7I3Hm4J9Jv-R3M9sDPd-_sqB2vkXFeHAYLUzbhf-0WWEgNHdlk8ZFc3xuv373F1ewgVvnJkSxC9hgM`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: imgSrc,
            options: {
              file_status: 'active',
              filename_only: true,
              max_results: 1,
            },
            match_field_options: {
              include_highlights: false,
            }
          }),
        });
        const data = await response.json();
        console.log(data)
        if(data.matches.length > 0) {
          const path = data.matches[0].metadata.metadata.path_display;
          const linkResponse = await fetch('https://api.dropboxapi.com/2/files/get_temporary_link', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer sl.B0crW9XajRKjmN-eh4o1hruWgkhLfS0pbyP-9UgqAmUoxA_fxjYHrSsyNB_XL-k3iVaiuKsaI7I3Hm4J9Jv-R3M9sDPd-_sqB2vkXFeHAYLUzbhf-0WWEgNHdlk8ZFc3xuv373F1ewgVvnJkSxC9hgM`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({path})
          });
          const linkData = await linkResponse.json();
          console.log(linkData)
          setImageUrl(linkData.link);
        }
      } catch (error){
        console.error('Error fetching image from Dropbox:', error);
      }
    }; 
    if(imgSrc){
      fetchImage();
    }
  }, [imgSrc, accessToken]);

  return (
    <div className="item">
    <Link to={{ pathname: `/product/${itemName}` }}> 
    <img className="item-img" src={imageUrl || './img/placeholder.png'} alt={itemName} />
     </Link>
      <div className="item-section-one">
        <div className="item-section-two">
          <div>
            <h2 className="item-name">{itemName}</h2>
            <p className="state">{condition}</p>
          </div>
          <p className="price">{price} $</p>
        </div>
        <div className="location-descr">
          <img src="./img/location.png" alt="Location" />
          <p>{location}</p>
        </div>
      </div>
    </div>
  );
};

export default Product;
