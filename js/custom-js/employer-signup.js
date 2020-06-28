const form = document.querySelector("form"),
  firstName = document.getElementById("firstName"),
  lastName = document.getElementById("lastName"),
  email = document.getElementById("email"),
  employerType = document.getElementById("employerType"),
  password = document.getElementById("password"),
  confirmPassword = document.getElementById("confirmPassword");
const phoneNo = document.getElementById("phoneNo");

// object with validation status
const validated = {
  firstName: false,
  lastName: false,
  email: false,
  phoneNo: false,
  // employerType: false,
  password: false,
  confirmPassword: false,
};

// Show input error message
function showError(input, message) {
  const parent = input.parentElement;
  input.classList.add("is-invalid");
  let error = parent.querySelector("div");
  error.className = "invalid-feedback";
  error.innerText = input.value !== "" ? message : "";
  validated[input.id] = false;
  // console.log(parent.removeChild(div.inv))
}

// clear error message
function clearError(input) {
  const parent = input.parentElement;
  input.classList.remove("is-invalid");
  input.classList.remove("is-valid");
  const error = parent.querySelector("div");
  error.innerText = "";
}

function showRequired(input, message) {
  const parent = input.parentElement;
  const error = parent.querySelector("div");
  input.classList.add("is-invalid");
  error.className = "invalid-feedback";
  error.innerText = message;
  validated[input.id] = false;
}

// Show success outline
function showSuccess(input) {
  const parent = input.parentElement;
  input.classList.remove("is-invalid");
  input.classList.add("is-valid");
  validated[input.id] = true;
}

// email validation
function checkEmail(input) {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, "Email is not valid.");
  }
}

// Check Required fields
function checkRequired(inputArr) {
  inputArr.forEach(function (input) {
    if (validated[input.id] === false && input.value.trim() === "") {
      // console.log(validated[input.id]);
      showRequired(input, `${getFieldName(input)} is required`);
    }
  });
}

// check input length
function checkLength(input, min, max = 30) {
  if (input.value.length < 1) {
    return;
  }
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must have at least ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must have less than ${max + 1} characters`
    );
  } else {
    showSuccess(input);
  }
}

// get field names
function getFieldName(input) {
  const fieldName = input.id.charAt(0).toUpperCase().concat(input.id.slice(1));
  return fieldName === "LastName"
    ? "Last Name"
    : fieldName === "FirstName"
    ? "First Name"
    : fieldName === "ConfirmPassword"
    ? "Password Confirmation"
    : fieldName === "PhoneNo"
    ? "Phone Number"
    : fieldName;
}

// check password
function checkPassword(input) {
  let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;

  if (input.value.length > 7) {
    if (!regex.test(input.value)) {
      showError(
        input,
        "Weak Password: password must include a capital letter, a symbol and a number"
      );
    } else if (regex.test(input.value)) {
      showSuccess(input);
    }
  } else {
    showError(
      input,
      "Password must be at least 8 characters long and include a capital letter, a symbol and a number"
    );
  }
}

// check passwords match
function checkPasswordsMatch(input1, input2) {
  if (input1.value && input2.value) {
    if (input1.value !== input2.value) {
      showError(input2, "Passwords do not match");
      console.log(input2.id);
    } else {
      showSuccess(input2);
    }
  }
}

// event listeners
email.addEventListener("input", () => {
  clearError(email);
  if (email.value !== "") {
    setTimeout(() => {
      checkEmail(email);
    }, 1000);
  } else {
    clearError(email);
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  checkRequired([
    firstName,
    lastName,
    email,
    phoneNo,
    password,
    confirmPassword,
  ]);
  checkLength(firstName, 2);
  checkLength(lastName, 2);
  checkEmail(email);
  checkLength(phoneNo, 10);
  checkPassword(password);
  checkPasswordsMatch(password, confirmPassword);

  // console.log(validated);
  if (!Object.values(validated).includes(false)) {
    const formData = {
      firstName: firstName.value.trim(),
      lastName: lastName.value.trim(),
      email: email.value.trim(),
      password: password.value,
      phoneNo: phoneNo.value.trim(),
    };

    const signupEmployer = async () => {
      const API_URL = "https://api.lancers.app/v1/auth/employer-signup";

      const res = await fetch(API_URL, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify(formData),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "User-Agent": "Developers Lancers",
        },
        redirect: "follow",
      });

      const data = await res.json();

      try {
        console.log(data);
      } catch (error) {
        console.log("Error:", error);
      }
    };

    // check for agreement to terms
    if (document.getElementById("termsPolicy").checked) {
      signupEmployer(formData);
      // $("#exampleModal").modal();
    } else {
      alert("Please agree to the Terms and Conditions to proceed.");
    }
  }
});

// firstName.value = "testFirstName";
// lastName.value = "testLastName";
// email.value = "test@example.com";
// password.value = "Test&1234";
// confirmPassword.value = "Test&1234";
// phoneNo.value = +2348012345678;
// document.getElementById("termsPolicy").checked = true;

// console.log(password.value, checkPassword(password));
