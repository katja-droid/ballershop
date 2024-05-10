import React, { useState, useEffect } from 'react';
import './Description.css';

const Description = (props) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`http://localhost:5001/user/${props.product.user}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const userData = await response.json();
                setUser(userData);
            } catch (error) {
                console.error("Failed to fetch user:", error);
            }
        };

        fetchUser();
    }, [props.product.user]);

    const productDescribed = props.product;

    return (
        <div className='description'>
            <h1>{productDescribed.name}</h1>
            <div className='characteristic'>
                <p>Cushion: </p>
                <p>{productDescribed.cushioning}</p>
            </div>
            <div className='characteristic'>
                <p>Traction: </p>
                <p>{productDescribed.traction}</p>
            </div>
            <div className='characteristic'>
                <p>Supportive Fit: </p>
                <p>{productDescribed.supportive}</p>
            </div>
            <div className='characteristic'>
                <p>Lightweight: </p>
                <p>{productDescribed.lightweight}</p>
            </div>
            <div className='characteristic'>
                <p>Durability: </p>
                <p>{productDescribed.durability}</p>
            </div>
            <div className='characteristic'>
                <p>Signature Details: </p>
                <p>{productDescribed.signature}</p>
            </div>
            <div className='characteristic'>
                <p>Versatility: </p>
                <p>{productDescribed.versatility}</p>
            </div>
            <p>{productDescribed.description}</p>
            <div className='description-buttons'>
                <button className='buy' onClick={props.handleShowModal}>BUY NOW</button>
                <button className='contact' onClick={props.handleShowPhoneModal}>CONTACT SELLER</button>
            </div>
            {user && (
                <div className='description-user'>
                    <img src={`/img/profile-dark.png`} alt="User Profile"/>
                    <p>{user.username}</p>
                </div>
            )}
        </div>
    )
}

export default Description;
