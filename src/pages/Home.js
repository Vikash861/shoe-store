import React from "react";
import Products from "../components/Products";
import Banner from '../images/banner.png'
import Footer from "../components/Footer"
import { Link } from "react-router-dom"

const Home = () => {
  return (
    <>
      <div className=" container mx-auto flex justify-between items-center my-4 w-full p-4 rounded bg-green-400">
        <div className="flex justify-center w-1/2 justify-center">
          <div className="flex flex-col gap-8">
            <h1 className="antonFont text-6xl italic">Stay on Sprit</h1>
            <Link to="products" className="bg-gray-900 flex items-center justify-center text-white w-28 h-12  rounded-3xl">
              Buy Now
            </Link>
          </div>
        </div>

        <div className="w-1/2">
          <img src={Banner} alt="banner" />
        </div>
      </div>



      <div>
        <Products />
      </div>
      <Footer/>
    </>
  );
};

export default Home;
