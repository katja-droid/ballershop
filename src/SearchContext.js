// src/context/SearchContext.js
import React, { createContext, useContext, useState } from 'react';

const SearchContext = createContext(); //Створення контексту

export const useSearch = () => useContext(SearchContext); //Хук для використання контексту

export const SearchProvider = ({ children }) => { //компонент що надає контекст
  const [searchTerm, setSearchTerm] = useState(''); //Стан пошуку, спочатку порожній

  const updateSearchTerm = (term) => { //Оновленя стану пошуку
    setSearchTerm(term);
  };

  return (
    <SearchContext.Provider value={{ searchTerm, updateSearchTerm }}> 
      {children}
    </SearchContext.Provider>
  );
};
