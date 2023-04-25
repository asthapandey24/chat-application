function signup(event){
    event.preventDefault();
    let name = event.target.name.value;
    let email = event.target.email.value;
    let password = event.target.password.value;
    let phonenumber = event.target.phonenumber.value;
    let myObj = {
        name,
        email,
        password,
        phonenumber
    }

    axios.post('http://localhost:3000/user/signup',myObj )
     .then((response)=>{
        alert('signedUp Successfully')
        console.log(response) 
     })
     .catch((err)=>{
        document.body.innerHTML = document.body.innerHTML + "<h4> Something went wrong </h4>"
        console.log(err)
     })

    }
