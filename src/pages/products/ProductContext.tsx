import React, { createContext, useState, useEffect } from 'react';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [businessIds, setBusinessIds] = useState([]); // State to store business IDs

  useEffect(() => {
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    }

    fetchBusinessData();
  }, []);

  const fetchBusinessData = async () => {
    try {
      const response = await fetch('https://yummycodicon.azurewebsites.net/business');
      const data = await response.json();
      if (data.length > 0) {
        setBusinessIds([data[0].id]);
        localStorage.setItem('businessIds', JSON.stringify([data[0].id]));
      }
    } catch (error) {
      console.error('Error fetching business data:', error);
    }
  };

  const deleteProduct = (product) => {
    const updatedProducts = products.filter((p) => p.name !== product.name);
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
  };

  const addProduct = (product) => {
    const newProducts = [...products, product];
    setProducts(newProducts);
    localStorage.setItem('products', JSON.stringify(newProducts));
  };

  return (
    <ProductContext.Provider value={{ products, businessIds, addProduct, deleteProduct }}>
      {children}
    </ProductContext.Provider>
  );
};



