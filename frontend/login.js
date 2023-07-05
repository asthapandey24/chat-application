 async function login(event){
    event.preventDefault()
    try{
    let logindetails = {
        email: event.target.email.value,
        password: event.target.password.value
    }

     const response = await axios.post('http://localhost:3000/login',logindetails)
     console.log(response.data.userdata)
     if(response.data.success === true){
        alert('user loggedin successfully')
         localStorage.setItem("token",response.data.userdata);

        window.location = 'group.html'
     }
     else{
        console.log(response.data.msg)
     }

    }catch(err){

        document.body.innerHTML = document.body.innerHTML + "<h4> user doesn't match </h4>"
       console.log(err)
    }

}

