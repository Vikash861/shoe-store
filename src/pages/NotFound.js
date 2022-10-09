import React from "react";
import { Link } from "react-router-dom";

const NotFound = () =>{

	return(
			<div className="flex flex-col gap-8 h-screen w-screen items-center justify-center">
				<h1 className=" text-8xl ">404</h1>
				<h2>Page not found</h2>
		        <Link className="bg-blue-600 font-bold text-white rounded-xl ease-in-out shadow-xl px-8 py-4" to="/">
		        Home
		        </Link>
	        </div>
		)
}

export default NotFound;