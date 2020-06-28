const form = document.querySelector("form"),
  firstName = document.getElementById("firstName"),
  lastName = document.getElementById("lastName"),
  email = document.getElementById("email"),
  employerType = document.getElementById("employerType"),
  password = document.getElementById("password"),
  confirmPassword = document.getElementById("confirmPassword"),
  phoneNo = document.getElementById("phoneNo"),
  alert = document.getElementById("alert"),
  alertHeading = document.getElementById("alertHeading"),
  alertMessage = document.getElementById("alertMessage");

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
  clearError(input);
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else if (input.value.length > 0) {
    showError(input, "Email is not valid.");
  }
}

// check phone number
function checkPhone(input) {
  // const regex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g;
  // const length = String(Number(input.value)).length;
  const length = input.value.length;
  if (length > 10 && length < 16) {
    if (!/^0/.test(input.value.trim())) {
      showError(input, "Phone number must begin with 0");
    } else {
      // showError(input, "Please enter a valid phone number");
      showSuccess(input);
    }
  } else if (/\D/.test(input.value.trim())) {
    showError(input, "Phone number must only contain digits");
  } else {
    showError(input, "Phone number must be 11 to 15 digits");
  }
}

// Check Required fields
function checkRequired(inputArr) {
  inputArr.forEach(function (input) {
    if (input.value.trim() === "") {
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
  clearError(input);
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
    } else {
      showSuccess(input2);
    }
  }
}

// event listeners
firstName.addEventListener("blur", () => {
  clearError(firstName);
});

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

phoneNo.addEventListener("blur", () => {
  clearError(phoneNo);
  if (phoneNo.value !== "") {
    checkPhone(phoneNo);
  } else {
    clearError(phoneNo);
  }
});

password.addEventListener("blur", () => {
  clearError(password);
  if (password.value !== "") {
    checkPassword(password);
  } else {
    clearError(password);
  }
});

confirmPassword.addEventListener("blur", () => {
  clearError(confirmPassword);
  if (confirmPassword.value !== "") {
    checkPasswordsMatch(password, confirmPassword);
  } else {
    clearError(confirmPassword);
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  alert.classList.add("d-none");

  checkLength(firstName, 2);
  checkLength(lastName, 2);
  checkEmail(email);
  checkPhone(phoneNo);
  checkPassword(password);
  checkPasswordsMatch(password, confirmPassword);
  checkRequired([
    firstName,
    lastName,
    email,
    phoneNo,
    password,
    confirmPassword,
  ]);

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
        // mode: "no-cors",
        body: JSON.stringify(formData),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "User-Agent": "Developers Lancers",
        },
        redirect: "follow",
      });

      const data = await res.json();

      try {
        if (data.status === "success") {
          $("#exampleModal").modal();
        } else if (data.status === "error") {
          const message =
            data.error === "Someone has already registered this email"
              ? "Email already registered"
              : data.error === "Phone number already exist"
              ? "Phone number already exists"
              : data.error;
          alert.classList = "alert alert-danger";
          alertMessage.innerText = message;
        }
      } catch (error) {
        console.log("Error:", error);
      }
    };

    // check for agreement to terms
    if (document.getElementById("termsPolicy").checked) {
      signupEmployer(formData);
      // $("#exampleModal").modal();
    } else {
      alert.classList = "alert alert-danger";
      alertMessage.innerText =
        "Please agree to the Terms and Conditions to proceed.";
    }
  }
});
