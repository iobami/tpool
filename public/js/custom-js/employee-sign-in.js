//starter JavaScript for disabling form submissions if there are invalid fields
(function () {
	"use strict";
  
	window.addEventListener(
	  "load",
	  function () {
		// Fetch all the forms we want to apply custom Bootstrap validation styles to
		var forms = document.getElementsByClassName("needs-validation");
  
		// Loop over them and prevent submission
		Array.prototype.filter.call(forms, function (form) {
		  form.addEventListener(
			"submit",
			function (event) {
			  if (form.checkValidity() === false) {
				event.preventDefault();
				event.stopPropagation();
			  }
			  form.classList.add("was-validated");
			},
			false
		  );
		});
	  },
	  false
	);
  })();
  
  // Function to show alert message
  function showMessage(message, alertType) {
	const alert = document.createElement("div");
	alert.id = "parentdiv";
	const parent = document.querySelector("#parent");
  
	alert.innerHTML = `
   <div class="alert ${alertType}" role="alert" id="error">
	 ${message}
   </div>
   `;
	parent.insertBefore(alert, form);
	setTimeout(removeMessage, 6000);
  }
  
  // Function to remove alert message
  function removeMessage() {
	let error = document.getElementById("parentdiv");
	error.remove();
  }
  
  // loads button while http respnse hasn't been recieved
  function loadButton() {
	const buttonDiv = document.querySelector("#button-div");
	buttonDiv.innerHTML = `
	<button class="btn btn-primary btn-color w-100 py-3 m-2" type="button" disabled>
		<span class="spinner-border spinner-border" role="status" aria-hidden="true"></span>
		<span class="sr-only">Loading...</span>
	</button>
	`;
  }
  
  // Function to revert back to sign in button upon recieving http response
  function revertButton() {
	const buttonDiv = document.querySelector("#button-div");
	buttonDiv.innerHTML = `
   <button class="btn btn-primary btn-block btn-color py-3 mt-3 mb-4" id="signup-btn" type="submit">Sign Up</button>
   `;
  }
  
  // Function to handle response from API
  function responseHandler(res) {
	revertButton();
  
	if (res.status === "error") {
	  showMessage(res.error, "alert-danger");
	}
  
	if (res.status === "success") {
	  showMessage("Sign in successful. Re-directing...", "alert-success");
	  const value = {
		token: res.data.token,
		userId: res.data.user,
	  };
	  localStorage.setItem("tpAuth", JSON.stringify(value));
  
	  // Decoding token
	  const response = JSON.parse(atob(value.token.split(".")[1]));
  
	  // Redirecting
	  if (response.userTypeId == null) {
		// Redirect to employer profile creation page
		return (window.location.href = "/employee-profileCreation");
	  } else if (response.userTypeId !== null) {
		// Add userTypeId to to tpAuth in localStorage
		const newValue = {
		  token: res.data.token,
		  userId: res.data.user,
		  userTypeId: response.userTypeId,
		  role: response.userRole
		};
		localStorage.setItem("tpAuth", JSON.stringify(newValue));
		return (window.location.href = "/employee-dashboard");
	  } else {
		// Redirect to dashboard
		return (window.location.href = "/employee-dashboard");
	  }
	}
  }
  
  // Function to handle error from http request
  function errorHandler(err) {
	revertButton();
	showMessage("Sign In failed. Please try again", "alert-danger");
  }
  
  // Function to send user data to API
  async function sendData(userData) {
	const url = "https://api.lancers.app/v1/auth/employee-login";
  
	try {
	  const res = axios({
		method: "post",
		url: url,
		data: userData,
		headers: {
		  "Content-type": "application/json",
		},
	  });
	  return res;
	} catch (err) {
	  console.log(err);
	}
  }
  
  // Perform action on form submission
  form.addEventListener("submit", (e) => {
	const email = document.querySelector("#email"),
	  password = document.querySelector("#password");
  
	if (form.checkValidity() === true) {
	  e.preventDefault();
	  loadButton();
  
	  const userData = {
		email: email.value,
		password: password.value,
	  };
  
	  sendData(userData)
		.then((res) => {
		  responseHandler(res.data);
		})
		.catch((err) => errorHandler(err));
	}
  });
  