import React, { useContext,useEffect } from "react";
import { Link } from "react-router-dom";
import "./style/navigation.css";
import { BsCart4 } from "react-icons/bs";
import Logo from "../images/logo.png";
import { CartContext } from "../CartContext";

const Navigation = () => {
  const { cart, auth, setAuth} = useContext(CartContext);

  const handleLogout = () =>{
    const refresh_token = localStorage.getItem('refresh_token');

    fetch('/api/logout', { 
      method:'POST',
			headers:{
				'Content-Type':'application/json'
			},
			body:JSON.stringify({
        refresh_token
			})
    })
    .then(res=>res.json())
    .then(res=>{
      if(res.message){
        window.alert(`${res.message}`);
        return;
      }
      window.localStorage.removeItem('refresh_token');
      window.localStorage.removeItem('access_token');
      setAuth(false);
      window.location.href = "/"
    })

  }

  useEffect(()=>{
    const refresh_token = window.localStorage.getItem('refresh_token');
    if(refresh_token !== null){
      setAuth(true);
    }
    
  },[])

  return (
    <nav className=" nav py-1">
      <div className="container mx-auto m-2 flex justify-between">
        <Link className="flex items-center" to="/">
          <img className="h-14 w-14" src={Logo} alt="logo" />
          <span className="antonFont text-base">Shoes</span>
        </Link>
        <ul className="flex gap-4 items-center">
          <div className="flex gap-4">

            <li>
              <Link className=" text-lg  hover transition" to="/">
                Home
              </Link>
            </li>

            <li>
              <Link
                className=" text-lg hover transition"
                to="/products"
              >
                Products
              </Link>
            </li>


           
            
       

            <li className = {`${auth?"block":"hidden"}`}>
              <button onClick={handleLogout} className="text-lg hover transition">
                Logout
              </button>
            </li>

            <li className = {`${auth?"hidden":"block"}`}>
              <Link
                className="text-lg hover transition"
                to="/Login"
              >
                Login
              </Link>
            </li>

            <li className = {`${auth?"hidden":"block"}`}>
              <Link
                className="text-lg hover transition"
                to="/Register"
              >
                Register
              </Link>
            </li>


          </div>
          <div>
            <li>
              <Link to="/cart">
                <div className="h-10 w-24 cart flex justify-center items-center gap-2">
                  <span className="text-base">{cart.totalItems?cart.totalItems:0}</span>

                  <BsCart4 className="h-7 w-7 " />

                </div>
              </Link>
            </li>
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;



// to be implemented later
// <li className = {`${auth?"block":"hidden"}`}>
//               <Link
//                 className="text-lg hover transition"
//                 to="/orders"
//               >
//                 Orders
//               </Link>
//             </li>