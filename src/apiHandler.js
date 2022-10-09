

class ApiHandler{


    static getAccessToken = (path, body,head = {}) => {
        return new Promise((resolve, reject) => {
            fetch(path, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body)
            })
                .then(res => res.json())
                .then(res => {
                    resolve(res)
                })
                .catch(err => {
                    reject(err);
                })
        })
    }



    static allProducts = () =>{

        return new Promise((resolve,reject)=>{
            fetch("api/products")
            .then((response) => response.json())
            .then((products) => {
                resolve(products);
            })
            .catch(err=>{
                reject(err);
            })
        })
    }


    static deleteProduct = (id) =>{
        return new Promise((resolve,reject)=>{
            fetch(`api/products/${id}`,{
                method:'DELETE',
                headers:{
                    'Content-Type': 'application/json',
                }
            })
            .then((response) => response.json())
            .then((products) => {
                resolve(products);
            })
            .catch(err=>{
                reject(err);
            })
        })
    }

    


}


export default ApiHandler