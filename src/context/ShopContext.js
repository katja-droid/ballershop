import React, { createContext, useState, useContext } from 'react';

// Створюємо контекст
const ShopContext = createContext();
// Провайдер - компонент, у якому доступні дані контексту
export const ShopContextProvider = ({ children }) => {
  // стан категорії
  const [category, setCategory] = useState('Catalogue');
  // value - усі стани та ф-ї що експортуємо з контексту
  return (
    <ShopContext.Provider value={{ category, setCategory }}>
      {children}
    </ShopContext.Provider>
  );
};
  // кастомний хук, який дозволяє використовувати цей контекст
export const useShopContext = () => useContext(ShopContext);
