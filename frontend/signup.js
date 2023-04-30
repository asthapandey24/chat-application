async function signup(event){
    event.preventDefault();
    let name = event.target.name.value;
    let email = event.target.email.value;
    let password = event.target.password.value;
    let phonenumber = event.target.phonenumber.value;
    try{
    let myObj = {
        name,
        email,
        password,
        phonenumber
    }

    const response =  await axios.post('http://localhost:3000/signup',myObj )
     if(response.data.success == true){
        alert('signedUp Successfully')
        console.log(response) 
        window.location = 'login.html'
     }
     else{
      console.log('email already exist')
     }
   }catch(err){
        document.body.innerHTML = document.body.innerHTML + "<h4> Something went wrong </h4>"
        console.log(err)
   }
}