function handleSubmit(e){  
     e.preventDefault();  
     console.log("Submit is working");   
    
     // There was an error in your request error  
     
    document.getElementById('error').style.display = "none";   
    document.getElementById('error-currentPassword').style.display = "none";
    const queryStr = window.location.search;     
     let resetToken = queryStr.slice(1); 
     let newPassword = document.getElementById("password").value;  
     let confirmPassword = document.getElementById("confirmPassword").value;
      
     // Compare passwords   

    if(newPassword === confirmPassword){   
          let url = `https://api.lancers.app/v1/auth/reset-password/${resetToken}`;    
           axios.put(url, { "password": newPassword}, {   
                headers:{   
                       "Content-type": 
                    "application/json; charset=UTF-8" 
                  }   
                  })   
                   .then(res=>console.log(res))   
                    .catch(err=>{   
                           console.log(err)  
                            
                     document.getElementById('error-currentPassword').style.display = "block";   
                  }) ;  
                 } else{  
                       document.getElementById('error').style.display = "block"; 
                  } 
                }