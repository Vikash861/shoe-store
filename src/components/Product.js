import React from 'react'
import "./style/product.css";
import { Link } from "react-router-dom";
import { CartContext } from "../CartContext";
import { useContext, useState } from "react";

const Product = ({ id, name, image, size, price }) => {
  const { cart, setCart } = useContext(CartContext);
  const [isAdding, setIsAdding] = useState(false);

  const addToCart = (e, id) => {
    let _cart = { ...cart };
    if (!_cart.items) {
      _cart.items = {};
    }
    if (_cart.items[id]) {
      _cart.items[id] += 1;
    } else {
      _cart.items[id] = 1;
    }
    if (!_cart.totalItems) {
      _cart.totalItems = 1;
    } else {
      _cart.totalItems += 1;
    }
    setCart(_cart);
    setIsAdding(true);
    setTimeout(() => {
      setIsAdding(false);
    }, 200);
  };

  return (
    <div className="p-3 rounded product">
      <Link to={`/products/${id}`}>
       
        <img src={image} alt="shoes" className="h-40 mx-auto" />
      </Link>
      <div className="text-center">
        <h2 className="text-lg py-1">{name}</h2>
        <span className="bg-gray-200 px-4  rounded-full text-sm">{size}</span>
      </div>
      <div className="py-2">
        <span>₹ {price}</span>
        <button
          disabled={isAdding ? true : false}
          onClick={(e) => {
            addToCart(e, id);
          }}
          className={`${
            isAdding ? "bg-green-500" : " bg-black"
          } font-bold bg-black text-white px-3 py-1 rounded-full float-right`}
        >
          ADD{isAdding ? "ED" : ""}
        </button>
      </div>
    </div>
  );
};

export default Product;
