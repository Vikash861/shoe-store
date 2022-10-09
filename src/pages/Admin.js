import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import ApiHandler from '../apiHandler'
import Alert from "../components/Alert";
import {MdCancel} from "react-icons/md"
const Admin = () => {
	// setting all the product 
	const [products, setProducts] = useState([]);

	const navigate = useNavigate();

	const [admin, setAdmin] = useState(false);
	// Toggling adding form
	const [form, setForm] = useState(false);
	// Submitting loader
	const [submit,setSubmit] = useState(false);
	//Alert -- for toggling
	const [alertDisplay,setAlertDisplay ] = useState({
		message:"",
		color:"",
		display:"hidden"
	})

	const [inputs,setInputs] = useState({})

	const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  	}

  	const [createOrUpdate, setCreateOrUpdate] = useState("");

  	const [updateItemId,setUpdateItemId] = useState("");

	useEffect(() => {


		const refreshToken = localStorage.getItem('refresh_token');
		if (refreshToken === null) {
			navigate("/login");
		}
		else {
			ApiHandler.getAccessToken('api/refresh', { refresh_token: refreshToken })
				.then((res => {

					if(res.message)
						return;

					window.localStorage.setItem('access_token', res.access_token);
					window.localStorage.setItem('refresh_token', res.refresh_token);
					return res.access_token;
				}))
				.then(accessToken => {
					fetch('api/me',{
						method:'GET',
						headers:{
							'Content-Type': 'application/json',
							'authrization' : `bearer ${accessToken}`
						}
					})
					.then(res => res.json())
					.then(res=>{
						if(res.role !== "admin"){
							window.alert("Your are not admin")
							navigate("/");
							return;
						}

						setAdmin(true);
					})

				})

		}

		ApiHandler.allProducts()
		.then(products=>{
			if(products.message){
				window.alert(products.message);
			}
			setProducts(products);
		})




	}, [])


	const addItem = () =>{
		setForm(!form)
		setCreateOrUpdate("addItem")
	}

////////////////////////////////////HANDLING SUBMIT FORM FOR CRETE AND UPDATE///////////////////////////////
	const handleSubmit = (e) =>{
		e.preventDefault();

		const formData = new FormData();
	    formData.append("name", inputs.name);
	    formData.append("price",inputs.price);
	 	const image  = document.querySelector('input[type="file"]').files[0];
	 	formData.append("image",image);
	 	formData.append("size",inputs.size);
	 	setSubmit(true);

	 	if(createOrUpdate === 'addItem'){
		    fetch('api/products',{
				method:'POST', 
				body:formData
			})
			.then(res => res.json())
			.then(res=>{
				setSubmit(false);
				if(res.message){
					window.alert("please add image");
					return
				}


				// resetting form 
				setInputs({});
				e.target.reset();
		  		setAlertDisplay({
		  			message:"Product Added successfully",
		  			color:"bg-green-500",
		  			display:"block"
	  			})

				const newProducts = [res,...products];
				setProducts(newProducts);


				setTimeout(()=>{
					setAlertDisplay(preVal=>({...preVal,display:"hidden"}))
				},500)
			})
		}

		// updating product

		if(createOrUpdate === "updateItem"){
			fetch(`api/products/${updateItemId}`,{
				method:'PUT',
				body:formData
			})
			.then(res=>res.json())
			.then(res=>{
				setSubmit(false);
				if(res.message){
					window.alert(res.message);
					return;
				}
				setAlertDisplay({
		  			message:"Product updated successfully",
		  			color:"bg-yellow-400",
		  			display:"block"
	  			})

	  			// resetting the form
	  			setInputs({});
	  			e.target.reset();

	  			setForm(false);

		  		setTimeout(()=>{
		  			setAlertDisplay(preVal=>({...preVal,display:"hidden"}))
  				},1000)
			});
		}

	}
///////////////////////////////////////////////////HANDLING HANDLERS OF UPDATE AND DELETE///////////////////////////////////////

  const handleCancel = () =>{
  	setForm(false);
  }

  const handleUpdate = (productId) =>{

	  const product = products.filter((product)=>{
	  	return product._id === productId;
	  })

	  setForm(true);

	  setInputs({
	  	name:product[0].name,
	  	price:product[0].price,
	  	size:product[0].size
	  })

	 setCreateOrUpdate("updateItem");
	 setUpdateItemId(productId);

  }

  const handleDelete = (productId) =>{
  	ApiHandler.deleteProduct(productId)
  	.then(res=>{
  		if(res.message){
  			window.alert(res.message);
  			return;
  		}
  		const newProducts = products.filter(product=>{
  			return product._id !== productId;
  		})
  		setProducts(newProducts)

  		// showing alert
  		setAlertDisplay({
  			message:"Product deleted successfully",
  			color:"bg-red-500",
  			display:"block"
  		})

  		setTimeout(()=>{
  			setAlertDisplay({
  				message:"Product deleted successfully",
	  			color:"bg-red-500",
	  			display:"hidden"
	  			})
  		},1000)

  	})
  }
	

	return (


		
		<div className={` ${admin} ? "block" : "hidden" translate-x-8 translate-y-8 container mt-4 p-4 mx-auto`}>
			<Alert message={alertDisplay.message} color={alertDisplay.color} display={alertDisplay.display}/>
			<div className="flex justify-between">
				<button className="bg-yellow-400 px-4 py-2 rounded leading-none text-white">Orders</button>
				<button onClick={addItem} className="bg-green-400 transition ease-in-out duration-300 leading-none px-4 py-2 font-bold rounded text-white hover:bg-green-600">+</button>
			</div>

			<div>
				 <table className={`table-auto w-full mt-8`}>
				  <thead className=" text-lg text-left bg-slate-50">
					  <tr>
					    <th className="py-4">Image</th>
					    <th className="py-4">Name</th>
					    <th className="py-4">Price</th>
					    <th className="py-4">Size</th>
					    <th className="py-4">Action</th>
					  </tr>
				  </thead>


				  <tbody className="text-left]">
				  {
				  	products.map(product=>{
				  		return <tr key={product._id} className="hover:shadow">
					    <td className=" py-4"><img src={product.image} width="50px" height="50px"/></td>
					    <td className=" py-4">{product.name}</td>
					    <td className=" py-4">₹ {product.price}</td>
					    <td className=" py-4">{product.size}</td>
					    <td className="py-4 h-full">
					    <button onClick={()=>handleUpdate(product._id)} className=" mr-4 bg-yellow-400 hover:bg-yellow-600 text-white leading-none px-4 py-2 rounded-2xl">Update</button>
					   	<button onClick={()=>handleDelete(product._id)} className="bg-red-400 text-white hover:bg-red-600 leading-none px-4 py-2 rounded-2xl">Delete</button>
					   	</td>
					  </tr>
				  	})
				  }
					  

				  </tbody>

				</table> 

			</div>

			<form onSubmit = {handleSubmit} className={` ${form ? "block" : "hidden"} bg-white rounded-xl shadow-xl px-8 pt-12 pb-8 top-2/4 left-2/4 transform -translate-x-2/4 -translate-y-2/4 fixed my-8 flex flex-col gap-2`}>
				<button onClick={handleCancel} className="flex justify-end"><MdCancel className="text-2xl" /></button>
				<input onChange={handleChange} value={inputs.name} className="p-2" placeholder="name" type="text" name="name" required/>
				<input onChange={handleChange} value={inputs.price} className="p-2" placeholder="price" type="number" name="price" required/>
				<input className="p-2" type="file" name="image" accept="image/*"/>
				<input onChange={handleChange} value={inputs.size} className="p-2" placeholder="size" type="text" name="size"/>
				<input className="px-4 py-2 rounded bg-yellow-400 hover:bg-green-400 text-white cursor-pointer" type="submit" value={submit === true? "Adding...":"Add"}/>
			</form>

		</div>
	)
}

export default Admin;