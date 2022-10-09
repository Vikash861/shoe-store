import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../CartContext";
import cartEmpty from '../images/emptyCart.jpg'
import {useNavigate} from 'react-router-dom'

const Cart = () => {
  let total = 0
  const [products, setProducts] = useState([]);
  const { cart, setCart } = useContext(CartContext);
  const [priceFetched, togglePriceFetched] = useState(false);

  useEffect(() => {
    if (!cart.items) {
      return;
    }
    if (priceFetched) {
      return;
    }
    fetch('/api/products/cart-items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ids: Object.keys(cart.items) })
    })
      .then(res => res.json())
      .then(products => {
        setProducts(products);
        togglePriceFetched(true)
      })
  }, [cart])
  // getting product quantity
  const getQty = (productId) => {
    return cart.items[productId];
  }
  // increasing product quantity
  const incQty = (productId) => {
    const oldQty = cart.items[productId];
    const _cart = { ...cart };
    _cart.items[productId] = oldQty + 1;
    _cart.totalItems += 1;
    setCart(_cart);
  }

  const decQty = (productId) => {
    const oldQty = cart.items[productId];
    if (oldQty === 1) {
      return;
    }
    const _cart = { ...cart };
    _cart.items[productId] = oldQty - 1;
    _cart.totalItems -= 1;
    setCart(_cart);
  }

  const totalPrice = (productId, price) => {
    let sum = price * getQty(productId);
    total += sum;
    return sum
  }

  const handleDelete = (productId) => {
    const _cart = { ...cart };
    const qty = _cart.items[productId];
    delete _cart.items[productId];
    _cart.totalItems -= qty;
    setCart(_cart);
    const updatedProducts = products.filter((product) => product._id !== productId);
    setProducts(updatedProducts);
  }

  const navigate = useNavigate()
  const handleByNow = () =>{

    let accessToken = window.localStorage.getItem('access_token')
    if(accessToken === null){
      window.alert("you are probably not login please login or register");
    }
    else{
      setCart({});
      window.alert("Order made successful");
      navigate("/");
    }

  }


  return (
    !products.length ? <div className="flex items-center justify-center"><img className="w-1/3" src={cartEmpty} alt="cart" /></div> :
      <div className="container mx-auto lg:w-1/2 w-full pb-24">
        <h1 className="text-bold my-12">Cart items</h1>


        <ul>
          {
            products.map((product) => {


              return <li key={product._id} className="mb-12">
                <div className="flex justify-between items-center">
                  <div className="flex items-center bg">
                    <img className="h-12" src={product.image} alt="shoe" />
                    <span className="font-bold ml-4 w-48">{product.name}</span>
                  </div>

                  <div>
                    <button onClick={() => { decQty(product._id) }} className="bg-gray-900 text-white px-4 py-2 rounded-full leading-none">
                      -
                    </button>

                    <b className="px-4">{getQty(product._id)}</b>

                    <button onClick={() => { incQty(product._id) }} className="bg-gray-900 text-white px-4 py-2 rounded-full leading-none">
                      +
                    </button>
                  </div>

                  <span>₹{totalPrice(product._id, product.price)}</span>
                  <button onClick={() => { handleDelete(product._id) }} className="bg-red-500 px-4 py-2 rounded-full leading-none text-white">
                    Delete
                  </button>
                </div>
              </li>

            })
          }

        </ul>

        <hr className="my-6" />
        <div className="text-right">
          <b>Grand Total: ₹ {total}</b>
        </div>
        <div className="text-right mt-6">
          <button onClick={handleByNow} className="bg-yellow-500 px-4 py-2 rounded-full leading-none text-white">
            Buy Now
          </button>
        </div>
      </div>
  );
};

export default Cart;
