// const main = document.getElementById('main');
const form = document.querySelector('form');
const companyName = document.getElementById('companyName');
const email = document.getElementById('email');
const country = document.getElementById('country');
const state = document.getElementById('state');
const cardNumber = document.getElementById('cardNumber');
const expirationDate = document.getElementById('expirationDate');
const cvv = document.getElementById('cvv');
const button = document.querySelector('.form__button');

const validated = {
  companyName: false,
  email: false,
  country: false,
  cardNumber: false,
  expirationDate: false,
  cvv: false,
};

// Show input error message
function showError(input, message) {
  const parent = input.parentElement;
  input.classList.add('is-invalid');
  let error = parent.querySelector('div');
  error.className = 'invalid-feedback';
  error.innerText = input.value !== '' ? message : '';
  validated[input.id] = false;
  // console.log(parent.removeChild(div.inv))
}

// clear error message
function clearError(input) {
  const parent = input.parentElement;
  input.classList.remove('is-invalid');
  input.classList.remove('is-valid');
  const error = parent.querySelector('div');
  error.innerText = '';
}

function showRequired(input, message) {
  const parent = input.parentElement;
  const error = parent.querySelector('div');
  input.classList.add('is-invalid');
  error.className = 'invalid-feedback';
  error.innerText = message;
  validated[input.id] = false;
}

// Show success outline
function showSuccess(input) {
  const parent = input.parentElement;
  input.classList.remove('is-invalid');
  input.classList.add('is-valid');
  validated[input.id] = true;
}

// email validation
function checkEmail(input) {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, 'Email is not valid.');
  }
}

// credit card validation

// code gotten from stackoverflow - https://stackoverflow.com/questions/6176802/how-to-validate-a-credit-card-number

function validateCardNumber(no) {
  return (
    (no &&
      luhnCheck(no) &&
      no.length == 16 &&
      (no[0] == 4 ||
        (no[0] == 5 && no[1] >= 1 && no[1] <= 5) ||
        no.indexOf('6011') == 0 ||
        no.indexOf('65') == 0)) ||
    (no.length == 15 && (no.indexOf('34') == 0 || no.indexOf('37') == 0)) ||
    (no.length == 13 && no[0] == 4)
  );
}

function luhnCheck(val) {
  var sum = 0;
  for (var i = 0; i < val.length; i++) {
    var intVal = parseInt(val.substr(i, 1));
    if (i % 2 == 0) {
      intVal *= 2;
      if (intVal > 9) {
        intVal = 1 + (intVal % 10);
      }
    }
    sum += intVal;
  }
  return sum % 10 == 0;
}

// Check Required fields
function checkRequired(inputArr) {
  inputArr.forEach(function (input) {
    if (validated[input.id] === false && input.value.trim() === '') {
      // console.log(validated[input.id]);
      showRequired(input, `${getFieldName(input)} is required`);
    }
  });
}

// check input length
function checkLength(input, min, max) {
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

// get field name
function getFieldName(input) {
  const fieldName = input.id.charAt(0).toUpperCase().concat(input.id.slice(1));
  return fieldName === 'CompanyName'
    ? 'Company Name'
    : fieldName === 'CardNumber'
    ? 'Card Number'
    : fieldName === 'ExpirationDate'
    ? 'Expiration Date'
    : fieldName === 'Cvv'
    ? 'CVV'
    : fieldName;
}

// Event Listeners
companyName.addEventListener('input', () => {
  clearError(companyName);
  if (companyName.value !== '') {
    setTimeout(() => {
      checkLength(companyName, 1, 101);
    }, 1000);
  }
});

email.addEventListener('input', () => {
  clearError(email);
  if (email.value !== '') {
    setTimeout(() => {
      checkEmail(email);
    }, 1000);
  } else {
    clearError(email);
  }
});

country.addEventListener('change', () => {
  clearError(country);
  showSuccess(country);
});

cardNumber.addEventListener('input', () => {
  clearError(cardNumber);
  let value = cardNumber.value;
  setTimeout(() => {
    if (validateCardNumber(value)) {
      showSuccess(cardNumber);
    } else if (value) {
      showError(cardNumber, 'Invalid Card Number');
    } else {
      clearError(cardNumber);
    }
  }, 2000);
});

expirationDate.addEventListener('input', () => {
  clearError(expirationDate);
  let date = new Date(),
    month = date.getMonth() + 1,
    year = date.getFullYear();
  let value = expirationDate.value.trim();

  // console.log(value, month, year);
  // console.log(/(\d{2}\/\d{4})/.test(value));
  // console.log('month', value.split('/')[0] == month);

  setTimeout(() => {
    // check for improper format
    if (value !== '' && !/^(\d{2}\/\d{4})$/.test(value)) {
      return showError(expirationDate, 'Invalid Date');
    }
    // check for invalid month
    else if (
      value.length === 7 &&
      (+value.split('/')[0] < 1 || +value.split('/')[0] > 12)
    ) {
      return showError(expirationDate, 'Invalid month entered.');
    }
    // check for previous month
    else if (
      value.length === 7 &&
      +value.split('/')[1] == year &&
      +value.split('/')[0] < month
    ) {
      return showError(expirationDate, 'Card Expired');
    }
    // check for previous year
    else if (value.length === 7 && +value.split('/')[1] < year) {
      return showError(expirationDate, 'Card Expired');
    }
    // console.log(/(\d{2})\/(\d{4})/.test(value));
    else if (value) {
      showSuccess(expirationDate);
    }
  }, 1000);
});

cvv.addEventListener('input', () => {
  clearError(cvv);
  if (cvv.value !== '') {
    setTimeout(() => {
      checkLength(cvv, 3, 3);
      if (/\D+/.test(cvv.value)) {
        showError(cvv, `Please enter only digits`);
      }
    }, 1000);
  } else {
    clearError(cvv);
  }
});

// submit to API and handle response
form.addEventListener('submit', (e) => {
  e.preventDefault();
  ('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>');

  setTimeout(() => {
    button.innerHTML = 'Subscribe!';
  }, 5000);

  // console.log(validated);

  checkRequired([companyName, email, country, cardNumber, expirationDate, cvv]);

  if (!Object.values(validated).includes(false)) {
    Alert('Form Can Be Submitted');
  }

  /*   if (!Object.values(validated).includes(false)) {
    const formData = {
      companyName: companyName.value.trim(),
      email: email.value.toLowerCase().trim(),
      country: country.value,
      state: state.value,
      cardNumber: cardNumber.value.trim(),
      expirationDate: cvv.value,
      cvv: cvv.value,
    };

    const url = 'https://';

    async function saveBillingInfo(billingInfo) {
      const requestOptions = {
        method: 'POST',
        body: JSON.stringify(billingInfo),
        // Adding headers to the request
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      };
      try {
      } catch (error) {
        console.log('Error:', error);
      }
    }

    saveBillingInfo(formData);
  }*/
});

async function getCountriesList() {
  // const res = await fetch('https://restcountries.eu/rest/v2/all');

  const requestOptions = {
    headers: {
      Accept: 'application/json',
      'api-token':
        'AuXnFjES43NqbdODZoc1anLtpO9op_9HsA7hqU56HJoxlbbNrMsUAzmsp6cqoZ0HhWQ',
      'user-email': 'isaacsokari@gmail.com',
    },
  };

  const res = await fetch(
    'https://referential.p.rapidapi.com/v1/country?fields=currency%252Ccurrency_num_code%252Ccurrency_code%252Ccontinent_code%252Ccurrency%252Ciso_a3%252Cdial_code',
    {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'referential.p.rapidapi.com',
        'x-rapidapi-key': '0cd1577715msh752d6da52766120p198419jsn931788b6530a',
      },
    }
  );

  const data = await res.json();

  return data.sort((a, b) => {
    return a.value < b.value ? -1 : 1;
  });
}

// get states data
async function getStatesList() {
  const res = await fetch(
    'https://referential.p.rapidapi.com/v1/state?fields=iso_a2&lang=en',
    {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'referential.p.rapidapi.com',
        'x-rapidapi-key': '0cd1577715msh752d6da52766120p198419jsn931788b6530a',
      },
    }
  );
  const data = await res.json();

  const statesData = data
    .sort((a, b) => (a.value < b.value ? -1 : 1))
    .filter((c) => {
      return (
        c.iso_a2.toLowerCase() === country.value.split(',')[0].toLowerCase()
      );
    });

  // filter states to remove duplicates
  const filteredStates = [];

  statesData.forEach((obj) => {
    if (filteredStates.some((filtered) => filtered.key === obj.key)) {
      false;
    } else {
      filteredStates.push(obj);
    }
  });
  // console.log(filteredStates);
  return filteredStates;
}

// populate select country options
// note the option values are strings with arrays in this format [shortcode, name] to enable states fo be filtered
async function fillCountries() {
  const countries = await getCountriesList();

  countries.forEach((country) => {
    // console.log(country);
    document.getElementById(
      'country'
    ).innerHTML += `<option value='${country.key},${country.value}'>${country.value}</option>`;
  });
}

// populate state options on country select
country.addEventListener('change', async () => {
  const states = await getStatesList();

  state.innerHTML = '<option selected disabled value="">Select State</option>';

  states.forEach((province) => {
    state.innerHTML += `<option value='${province.value}'>${province.value}</option>`;
  });
});

document.addEventListener('DOMContentLoaded', () => {
  fillCountries();
});
