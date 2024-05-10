import React from 'react';
import './Category.css'
import { useFilters } from '../FilterContext';
import { useShopContext } from '../context/ShopContext';


const Category = (props) => {
  const { category, setCategory } = useShopContext();
  const { setFilters } = useFilters();
  const handleClick = () => {
    // Set the category in ShopContext
    setCategory(props.categoryName);
    // Adjust the implementation based on your actual filters structure
    setFilters(prevFilters => ({
      ...prevFilters,
      category: props.categoryName,
    }));
  };

  return (
    <div className="category" onClick={handleClick} style={{ backgroundColor: props.backgroundColor }}>
      <img src={props.imageSrc} alt={props.categoryName} />
      <p className="category-name">{props.categoryName}</p>
      <p className="category-offers">{props.offerCount} offers</p>
    </div>
  );
};

export default Category;
