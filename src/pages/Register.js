import React,{useState,useContext} from 'react';
import { CartContext } from "../CartContext";

const Register = () => {

	const [formData,setFromData] = useState({});
	const [submit,setSubmit] = useState(false);
	const {setAuth} = useContext(CartContext);


	const handleChange = (e) =>{
		const name = e.target.name;
		const value = e.target.value;
		setFromData(prevValue=>({...prevValue,[name]:value}));
	}

	const handleSubmit = (event) => {
		event.preventDefault();
		if(formData.password !== formData.repeatPassword) {
			window.alert('Please match your password and repeat password');
			return;
		}
		setSubmit(true);
		fetch('/api/register',{
			method:'POST',
			headers:{
				'Content-Type':'application/json'
			},
			body:JSON.stringify({
				name : formData.name,
				email : formData.email,
				password : formData.password
			})
		})
		.then(res=>res.json())
		.then(res=>{
			if(res.message){
				window.alert(res.message);
				setSubmit(false);
				return;
			}
			window.localStorage.setItem('access_token',res.access_token);
			window.localStorage.setItem('refresh_token',res.refresh_token);
			setAuth(true);
			setSubmit(false);
			setFromData({});
			window.history.back();
			

		}).catch((err)=>{
			console.log("error",err);
		})

		// reseting form


	}

	return (
		<div className=' border-xl mt-28 flex items-center justify-center'>
			<form className="flex flex-col gap-4 w-1/3" onSubmit={handleSubmit}>
					<input className="p-2" type="text"  name="name" placeholder="Full name" onChange = {handleChange}  value={formData.name||""} minlenght="3" required/>
					<input className="p-2" type="email"  name="email"placeholder="Your Email" onChange = {handleChange}  value={formData.email||""} required/>
					<input className="p-2" type="password" name="password" placeholder="Password" onChange = {handleChange} value={formData.password||""} minlenght="8" required/>
					<input className="p-2" type="password" name="repeatPassword" placeholder="Repeat Password" onChange = {handleChange} value={formData.repeatPassword||""} required/>
					<input className="p-2 rounded bg-gray-900 text-white cursor-pointer" type="submit" value={submit === true? "Loading...":"Submit"}/>
			</form>
		</div>
	)
}

export default Register;