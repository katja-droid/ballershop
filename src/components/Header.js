import React, { useState } from 'react';
import Filters from './Filters';
import './Header.css'
import { useShopContext } from '../context/ShopContext';
import { useSearch } from '../SearchContext'; 
import { useFilters } from '../FilterContext';
const Header = () => {
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [moreIconUrl, setIconUrl] = useState("/img/more-white.png");
  const { category, setCategory } = useShopContext();
  const { updateSearchTerm } = useSearch()
  const { filters, setFilters } = useFilters();
  return (
    <div className="header-main">
      <h1>{filters.category}</h1>
      <section className="search">
        <input type="text" name="search"  onChange={(e) => updateSearchTerm(e.target.value)} />
        <img className="search-icon" src="/img/search.png" alt="Search" />
        <img
          className="more-icon"
          src={moreIconUrl}
          alt="More"
          onClick={() => {setIsFilterVisible(!isFilterVisible);
            moreIconUrl==="/img/more-white.png"? setIconUrl("/img/more-violet.png") : setIconUrl("/img/more-white.png");
          }}
        />
      </section>
      {isFilterVisible ? <Filters /> : null}
      
    </div>
  );
};

export default Header;
