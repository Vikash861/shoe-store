import React from 'react';
import "./styles.css";
import Home from "./pages/Home";
import ProductsPage from "./pages/ProductsPage";
import Cart from "./pages/Cart";
import Admin from "./pages/Admin";

import Login from "./pages/Login";
import Register from "./pages/Register"
import Order from "./pages/Order"
import NotFound from "./pages/NotFound"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import SingleProduct from "./components/SingleProduct";
import { CartContext } from "./CartContext";
import { useEffect, useState } from "react";

export default function App() {
  const [cart, setCart] = useState({});
  const [auth, setAuth] = useState(false);
  // fetch from localStorage

  useEffect(() => {
    const cart = window.localStorage.getItem('cart');
    // console.log(JSON.parse(cart))
  },[]);

  useEffect(() => {
    window.localStorage.setItem('cart',JSON.stringify(cart));
  },[cart]);




  return (
    <>
      <Router>
        <CartContext.Provider value={{ cart, setCart, auth , setAuth }}>
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/products" element={<ProductsPage />}></Route>
            <Route path="/products/:id" element={<SingleProduct />}></Route>
            <Route path="/cart" element={<Cart />}></Route>
            <Route path="/admin" element={<Admin />}></Route>
            <Route path="/orders" element={<Order />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </CartContext.Provider>
      </Router>
    </>
  );
}
