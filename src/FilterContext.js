import React, { createContext, useContext, useState } from 'react';

const FilterContext = createContext();

export const useFilters = () => useContext(FilterContext);

export const FilterProvider = ({ children }) => {
  const [filters, setFilters] = useState({
    category: 'Catalogue',
    material: '',
    brand: '',
    state: '',
    size: '',
    priceFrom: '',
    priceTo: '',
  });

  return (
    <FilterContext.Provider value={{ filters, setFilters }}>
      {children}
    </FilterContext.Provider>
  );
};

// Export the filters object separately
export const defaultFilters = {
  category: '',
  material: '',
  brand: '',
  state: '',
  size: '',
  priceFrom: '',
  priceTo: '',
};
