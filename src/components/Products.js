import React from 'react'
import { useState, useEffect, useContext } from "react";
import Product from "./Product";
import { CartContext } from "../CartContext";

const Products = () => {
  // const {name} = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = {
    display: loading ? "block" : "none"
  };

  useEffect(() => {
    fetch("api/products")
      .then((response) => response.json())
      .then((products) => {
        setLoading(false);
        setProducts(products);
      });
  }, []);

  return (
    <div className="container mx-auto">
      <h1 className="text-lg font-bold my-8">Products</h1>

      <div className="grid lg:grid-cols-4 md:grid-cols-2 my-8 gap-10">
        <h1 style={load} className="text-lg font-bold">
          Loading...
        </h1>
        {products.map((product) => {
          return (
            <Product
              key={product._id}
              id={product._id}
              name={product.name}
              image={product.image}
              size={product.size}
              price={product.price}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Products;
