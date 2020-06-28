// //starter JavaScript for disabling form submissions if there are invalid fields
// (function () {
//     'use strict'
  
//     window.addEventListener('load', function () {
//       // Fetch all the forms we want to apply custom Bootstrap validation styles to
//       var forms = document.getElementsByClassName('needs-validation')
  
//       // Loop over them and prevent submission
//       Array.prototype.filter.call(forms, function (form) {
//         form.addEventListener('submit', function (event) {
//           if (form.checkValidity() === false) {
//             event.preventDefault()
//             event.stopPropagation()
//           }
//           form.classList.add('was-validated')
//         }, false)
//       })
//     }, false)
//   }())

const submitButton = document.getElementById('signup-btn')
const validCheck = document.getElementById('terms-policy')
//document.querySelector('.needs-validation').classList.add('was-validated')

submitButton.addEventListener('click', addUser = (e) => {
  e.preventDefault()

  checkInputs()
  status()
  //successSign()
  function status(){

    let firstName = document.getElementById('fname').value
    let lastName = document.getElementById('lname').value
    let email = document.getElementById('email').value
    let phone = document.getElementById('phone').value
    let password = document.getElementById('password').value
   
  
  
    fetch('https://api.lancers.app/v1/auth/employee-signup', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
        phoneNo: phone,
        password: password,
      })
    })
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
    })
    // .then(() => {
      //   submitButton.dataset.toggle = 'modal'
      // })
      .catch((err) => console.log(err))
    }
})

checkInputs = () => {
  let firstName = document.getElementById('fname').value.trim()
  let lastName = document.getElementById('lname').value.trim()
  let email = document.getElementById('email').value.trim()
  let phone = document.getElementById('phone').value.trim()
  let password = document.getElementById('password').value.trim()
  let passwordTwo = document.getElementById('confirmPassword').value.trim()
  
  if(firstName === '' ) {
    setError(firstName, '* First name cannot be blank')
  } else {
    setRight(firstName)
  }
  if(lastName === '' ) {
    setErrorL(lastName, '* Last name cannot be blank')
  } else {
    setRightL(lastName)
  }
  if(email === '' ) {
    setErrorE(email, '* Email cannot be blank')
  } else {
    setRightE(email)
  }
  if(phone === '' ) {
    setErrorP(phone, '* Phone cannot be blank')
  } else {
    setRightP(phone)
  }
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+-=`~{}[\]|'"<>,./?])(?=.{8,})/;
  if(password === '') {
    setErrorPass(password, '* Password cannot be blank')
  } else if(!password.match(regex)) {
    checkPass(password, '* Password must contain a minimum of 8 characters, a capital letter, a number and special character')
  } else {
    const small = document.querySelector('#invalidPass')
    small.style.display = 'none'
  }
  if(passwordTwo === '') {
    setErrorPass2(passwordTwo, '* Please confirm password')
  } else if(passwordTwo !== password) {
    checkPass2(passwordTwo, '* Passwords do not match')
  } else {
    const small = document.querySelector('#invalidPass2')
    small.style.display = 'none'
    $('#exampleModal').modal()
  }
  
}

//First Name Error Functions
setError = (input, message) => {
  //const inputGroup = input.parentElement
  const small = document.querySelector('#invalid')
  small.innerHTML = message
  small.style.display = 'block'
}

setRight = (input) => {
  const small = document.querySelector('#invalid')
  small.style.display = 'none'
}

//Last Name Error Functions
setErrorL = (input, message) => {
  //const inputGroup = input.parentElement
  const small = document.querySelector('#invalidL')
  small.innerHTML = message
  small.style.display = 'block'
}

setRightL = (input) => {
  const small = document.querySelector('#invalidL')
  small.style.display = 'none'
}

//Email Error Functions
setErrorE = (input, message) => {
  //const inputGroup = input.parentElement
  const small = document.querySelector('#invalidE')
  small.innerHTML = message
  small.style.display = 'block'
}

setRightE = (input) => {
  const small = document.querySelector('#invalidE')
  small.style.display = 'none'
}

//Email Error Functions
setErrorP = (input, message) => {
  //const inputGroup = input.parentElement
  const small = document.querySelector('#invalidP')
  small.innerHTML = message
  small.style.display = 'block'
}

setRightP = (input) => {
  const small = document.querySelector('#invalidP')
  small.style.display = 'none'
}

//Password Error Functions
setErrorPass = (input, message) => {
  const small = document.querySelector('#invalidPass')
  small.innerHTML = message
  small.style.display = 'block'
}

checkPass = (input, message) => {
  const small = document.querySelector('#invalidPass')
  small.innerHTML = message
  small.style.display = 'block'
}

setErrorPass2 = (input, message) => {
  const small = document.querySelector('#invalidPass2')
  small.innerHTML = message
  small.style.display = 'block'
}

checkPass2 = (input, message) => {
  const small = document.querySelector('#invalidPass2')
  small.innerHTML = message
  small.style.display = 'block'
}
