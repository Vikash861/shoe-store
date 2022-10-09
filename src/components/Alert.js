import React from "react";

const Alert = ({message,color,display}) =>{
	return(
		<div className={`h-max w-max ${display}  overflow-hidden fixed right-0 mr-14 top-1/4 rounded  shadow-lg bg-state-50 `}>
			<span className={`block h-2  w-full ${color}`}></span>
			<span className="block m-4 text-center">{message}</span>
		</div>
		)
}

export default Alert;