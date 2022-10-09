import React from 'react';
import Img from "../images/giphy.gif";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../CartContext";

const SingleProduct = () => {
  const [product, setProduct] = useState(null);
  const [isAdding,setIsAdding] = useState(false);
  const { cart, setCart} = useContext(CartContext);
  const params = useParams();

  useEffect(() => {
    fetch(`/api/products/${params.id}`)
      .then((response) => response.json())
      .then((products) => {
        setProduct(products);
      });
  }, [params.id]);

    const addToCart = (id) => {
    let _cart = { ...cart };
    if (!_cart.items) {
      _cart.items = {};
    }
    if (_cart.items[id]) {
      let check = window.alert("Product already added check cart page to increase quantity");
      return
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
    setIsAdding(true)
    setTimeout(()=>{
      setIsAdding(false);
    },200)
  };

  return (
    product === null ? <h1></h1> : 
    <div>
      <div
        className="container mx-auto flex items-center gap-8"
        style={{ height: "87vh" }}
      >
        <div className="w-1/2">
          <img src={product.image} alt="shoes pic" />
        </div>
         <div className="w-1/2">
          <h1 className="text-4xl mb-8">
            {product.name}
          </h1>
          <h3>Size Available</h3>
          <span className="bg-gray-200 rounded block w-max px-4 mt-1">
            {product.size}
          </span>
          <div className="flex gap-4">

            <button onClick={()=>{addToCart(product._id)}}  className={`${isAdding?"bg-green-200":"bg-gray-900"} mt-8 text-white p-2 rounded`}>
              Add to Cart
            </button>

            <button
              className=" mt-8 text-bold p-2 rounded shadow-xl"
              onClick={() => {
                window.history.back();
              }}
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
