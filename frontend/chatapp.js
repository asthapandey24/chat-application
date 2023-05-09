const messagelist = document.getElementById('messagelist');
const sendbtn = document.getElementById('send-message');
const input = document.getElementById('input')





var uname=""; 
var userid=0;

function parseJwt (token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}

(function(){
    const userdetail= parseJwt (localStorage.getItem('token'));
    console.log(userdetail);
    uname=userdetail.username;
    userid=userdetail.userid;
    console.log('userid'+userid);
   // document.getElementById('username').innerText=userdetail.username;
   }())









sendbtn.addEventListener('click', async function (e){
  try{
    e.preventDefault()
    const message = input.value.trim()
    const msg = {
         message
    } 
    const token=localStorage.getItem('token');

const response = await axios.post('http://localhost:3000/addchat',msg ,{headers: {'Authorization': token}})
console.log(response.data)
if(response.data.success === true){
    input.value = "";

}
else{
    console.log('somethong went wrong')
}
  }catch(err){
    if(err){
      unauthorized(err);
    }
    console.log(err)
  }

})

// observe the change in msglist
 const observer = new MutationObserver(function() {
     messagelist.scrollTop = messagelist.scrollHeight - messagelist.clientHeight;
   });
    observer.observe(messagelist, { childList: true });





window.addEventListener('DOMContentLoaded',async()=>{
    try {
      const token=localStorage.getItem('token');
      const userchat= await axios.get("http://localhost:3000/getchat",{
       headers: {
         'Authorization':token
       } 
     });
     const totalmesage= userchat.data.userchat.length
       
        localStorage.setItem('Lastmessageid',userchat.data.userchat[totalmesage-1].id);

       console.log(userchat.data);
       
       addMessageOnScreen(userchat)
    } catch (error) {
      console.log(error);
    }
    
  });



  function addMessageOnScreen(message)
  {
    
    
    console.log(message);
    for (var index = 0; index < message.data.userchat.length; index++) {
       const newMessage = document.createElement("li");
       newMessage.classList.add("message");
          if(message.data.userchat[index].userdetailId===userid)
          {
           
                newMessage.innerHTML =`
                <div class="message-content">
                  <p>${message.data.userchat[index].message}</p>
                </div>
                <div class="message-sender">
                  <span>You</span>
                </div>`;
              newMessage.style.textAlign = "right";
          }
          else{
            console.log("hi");
            newMessage.innerHTML = `
            <div class="message-sender">
            <span>${message.data.userchat[index].userdetail.username}</span>
          </div>
            <div class="message-content">
              <p>${message.data.userchat[index].message}</p>
            </div>`;
          newMessage.style.textAlign= "left";
    }
    messagelist.appendChild(newMessage);
  
} 
}

  try {
     setInterval(async() => {
          const token=localStorage.getItem('token');
           const LastMessageId=localStorage.getItem('Lastmessageid')
           console.log(LastMessageId);
       const userchat= await axios.get(`http://localhost:3000/getNewChat?lastmessageid=${LastMessageId}`,{
        headers: {
           'Authorization':token
         } 
       });
        console.log(userchat.data);
        const totalmesage= userchat.data.userchat.length
        console.log("totallen"+totalmesage);
       if(totalmesage>0){
           localStorage.setItem('Lastmessageid',userchat.data.userchat[totalmesage-1].id);
          addMessageOnScreen(userchat);
        }
     }, 1000);
   } catch (error) {
    console.log(error);
     unauthorized(error);
   }




function unauthorized(error)
{
  try {
        if(error.response.status===401)
      {
        alert("You are not authorized "+error);
        location.href='login.html';
      }
  } catch (error) {
      console.log(error);
  }
  
}



function create(){

 
  window.location.href = 'group.html';

}




  