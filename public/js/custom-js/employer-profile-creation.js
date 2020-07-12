const userInformation = JSON.parse(localStorage.getItem("tpAuth"));

const userInfo1 = JSON.parse(atob(userInformation.token.split('.')[1]));
const { userTypeId, userRole } = userInfo1;

const [navBar] = document.getElementsByClassName('navbar-brand');

if (userRole === 'ROL-EMPLOYEE') {
    if (userTypeId)  {
        navBar.href = '/employee-dashboard';
    } else {
        navBar.href = '/employee-profileCreation';
    }
}

if (userRole === 'ROL-EMPLOYER') {
  if (userTypeId)  {
      navBar.href = '/employer-dashboard';
  } else {
      navBar.href = '/employer-create-profile';
  }
}

// store data after image is read
let logoData;

const getEmployerType = () => {
  const employerType = document.getElementById('employer_type').value;
  const organizationNameContainer = document.getElementById('organizationNameContainer');
  const individualNameContainer = document.getElementById('individualNameContainer');
  const genderContainer = document.getElementById('genderContainer');
  const countryContainer = document.getElementById('countryContainer');
  const orgPhoneContainer = document.getElementById('orgPhoneContainer');

  const [firstName, lastName] = individualNameContainer.querySelectorAll('input');
  const [orgName] = organizationNameContainer.querySelectorAll('input');


  if (employerType.toLowerCase() === 'individual') {
    organizationNameContainer.style.display = 'none';
    individualNameContainer.style.display = 'block';
    genderContainer.style.display = 'block';
    countryContainer.style.paddingLeft = '0';
    orgPhoneContainer.style.paddingLeft = '';
    orgPhoneContainer.className = 'col-sm-6';
    firstName.setAttribute('required', true);
    lastName.setAttribute('required', true);
    orgName.removeAttribute('required');

    inputSize()
  } else {
    organizationNameContainer.style.display = 'block';
    individualNameContainer.style.display = 'none';
    genderContainer.style.display = 'none';
    countryContainer.style.paddingLeft = '';
    orgPhoneContainer.className = 'col-sm-8';
    orgName.setAttribute('required', true);
    firstName.removeAttribute('required');
    lastName.removeAttribute('required');

    inputSize()
  }
};

const inputSize = () => {
    const individualNameContainer = document.getElementById('individualNameContainer');
    const organizationNameContainer = document.getElementById('organizationNameContainer');
    const genderContainer = document.getElementById('genderContainer');
    const countryContainer = document.getElementById('countryContainer');
    const orgPhoneContainer = document.getElementById('orgPhoneContainer');

    if ((window.innerWidth < 576) && (    individualNameContainer.style.display === 'block')) {
        genderContainer.className = 'col-sm-6 col-6';
        countryContainer.className = 'col-sm-6 col-6';
        orgPhoneContainer.className = 'col-sm-12 col-12';
    }

    if ((window.innerWidth < 576) && (    organizationNameContainer.style.display === 'block')) {
        countryContainer.className = 'col-sm-3 col-3';
        orgPhoneContainer.className = 'col-sm-9 col-9';
    }

    if ((window.innerWidth >= 576) && (    individualNameContainer.style.display === 'block')) {
        genderContainer.className = 'col-sm-4 col-4';
        countryContainer.className = 'col-sm-3 col-3';
        countryContainer.style.paddingLeft = '0';
        orgPhoneContainer.className = 'col-sm-5 col-5';
        orgPhoneContainer.style.paddingLeft = '0';
    }

    if ((window.innerWidth >= 576) && (    organizationNameContainer.style.display === 'block')) {
        countryContainer.className = 'col-sm-4 col-4';
        orgPhoneContainer.className = 'col-sm-8 col-8';
    }
};

// Get data for the company types
const requestOptions = {
  headers: {
    "Content-Type": "application/json; charset=UTF-8",
    "User-Agent": "Developers Lancers",
    Authorization: `Bearer ${userInformation.token}`,
  }
};
const url = 'https://api.lancers.app/v1/company/category';
async function getData(){
  try {
    const companyTypes = await fetch(url , requestOptions);
    const { data } = await companyTypes.json();

    let dropdown = document.getElementById('company_category');
    let option;
      data.forEach((data) => {
        option = document.createElement('option');
        option.innerHTML = data.category_name;
        option.value = data.category_id;
        dropdown.appendChild(option);
    });

  } catch (error) {
    // Display error
    showAlert(error)
  }
}
getData().then();

(function() {
    'use strict';
    window.addEventListener('load', function() {
        // Get the forms we want to add validation styles to
        const forms = document.getElementsByClassName('needs-validation');
        // Loop over them and prevent submission
        Array.prototype.filter.call(forms, function(form) {
            form.addEventListener('submit', async function(event) {
                const [empType, gender, industryType] = document.querySelectorAll('form select');
                const [, formData] = document.querySelectorAll('form');
                const uploadBtn = document.getElementById('uploadProfile');
                const loader = document.getElementById('loader');

                let addValidation = true;

                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                } else if (form.checkValidity()) {
                    event.preventDefault();

                    if (checkUploadedImage()) {
                        toaster('! Please upload an image', 'error');
                        removeToaster(4000);
                        return;
                    }

                    uploadBtn.style.display = 'none';
                    loader.style.display = 'inline-block';

                    const details = await getUserDetails(empType.value, gender.value, industryType.value, formData);
                    const response = await createProfile(details);
                    console.log(response);

                    formData.className = 'needs-validation';
                    addValidation = false;

                    if (response.status === 'success') {
                        toaster(`! ${response.message}`, 'success');
                        removeToaster(2000);
                        const redirect = () => {
                            window.location.replace('/employer-dashboard');
                            loader.style.display = 'none';
                            uploadBtn.style.display = 'inline-block';
                        };
                        setTimeout(redirect, 2000);
                    } else {
                        toaster(`! ${response.message}`, 'error');
                        removeToaster(4000);
                        loader.style.display = 'none';
                        uploadBtn.style.display = 'inline-block';
                    }
                }

                if (addValidation) {
                    form.classList.add('was-validated');
                }
                event.preventDefault();
            }, false);
        });
    }, false);
})();

const createProfile = async (userData) => {
    console.log(userData);
    const profileUrl = 'https://api.lancers.app/v1/employer/create';

    try {
        const { data } = await axios({
            method: 'POST',
            url: profileUrl,
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
                Authorization: `Bearer ${userInformation.token}`,
            },
            data: userData
        });

        return data;
    } catch (e) {
        return e;
    }
};

const getUserDetails = (empType, gender, industryType, formData) => {
    const inputTags = formData.querySelectorAll('input');
    const [description] = formData.querySelectorAll('textarea');

    if (empType.toLowerCase() === 'company') {

      const [ , , orgName, , , orgEmail, orgCountry, orgPhone, orgWebsite, orgAddress] = inputTags;

        return getFormData({
            photo: logoData,
            employerType: empType,
            organizationName: orgName.value,
            employerName: null,
            companyCategoryId: industryType,
            description: description.value,
            gender: null,
            companyCountry: orgCountry.value,
            companyPhone: orgPhone.value,
            companyEmail: orgEmail.value,
            companyAddress: orgAddress.value,
            website: orgWebsite.value,
            userId: userInfo1.userId
        });

    } else {
      // return employer data
        const [ , , , firstName, lastName, orgEmail, orgCountry, orgPhone, orgWebsite, orgAddress] = inputTags;

        return getFormData({
            photo: logoData,
            employerType: empType,
            organizationName: null,
            employerName: `${firstName.value} ${lastName.value}`,
            companyCategoryId: industryType,
            description: description.value,
            gender: gender,
            companyCountry: orgCountry.value,
            companyPhone: orgPhone.value,
            companyEmail: orgEmail.value,
            companyAddress: orgAddress.value,
            website: orgWebsite.value,
            userId: userInfo1.userId
        });
    }
};

const getFormData = ({ photo, employerType, organizationName, employerName, companyCategoryId,
                         description, gender, companyCountry, companyPhone, companyEmail,
                         companyAddress, website, userId
                    }) => {

    const fileUploadData = new FormData();
    fileUploadData.append('photo', photo);
    fileUploadData.append('employerType', employerType);
    fileUploadData.append('employerName', employerName);
    fileUploadData.append('companyCategoryId', companyCategoryId);
    fileUploadData.append('description', description);
    fileUploadData.append('gender', gender);
    fileUploadData.append('companyCountry', companyCountry);
    fileUploadData.append('companyPhone', companyPhone);
    fileUploadData.append('companyEmail', companyEmail);
    fileUploadData.append('companyAddress', companyAddress);
    fileUploadData.append('website', website);
    fileUploadData.append('userId', userId);

    return fileUploadData;
};

const checkUploadedImage = () => {
    const imageData = document.getElementById('organization_logo');
    const files = imageData.files;

    if (!files.length) return true;
};

const readImage = () => {
    const imageData = document.getElementById('organization_logo');
    const files = imageData.files;

    if (!files.length) return;

    const [imageFile] = files;
    const fileNameArray = imageFile.name.split('.');
    const fileExtension = fileNameArray[fileNameArray.length - 1].toLowerCase();
    if (['jpg', 'jpeg', 'png'].includes(fileExtension) === false) {
        alert('This file is not in a JPG, JPEG or PNG format.');
        return;
    }

    if (files.length) {
        labelText(imageFile.name);

        const reader = new FileReader();

        reader.onload = function changeFile(e) {
            $('#profile-image-preview')
                .attr('src', e.target.result);
        };

        reader.readAsDataURL(imageFile);
    }

    logoData = imageFile;
};

const labelText = (value) => {
    const labelText = document.getElementById('logo');
    labelText.value = value
};

// show alert message on page
function showAlert(message) {
  const alert = document.getElementById('alert');
  const alertMessage = document.getElementById('alertMessage');

  alert.classList.remove('d-none');
  alertMessage.innerText = message;
  setTimeout(() => {
    hideAlert()
  }, 6000);
}

function hideAlert() {
  document.getElementById('alert').classList.add('d-none');
}

const toaster = (message, type) => {
    const [messageSpan] = document.querySelectorAll('.slide-in-content span');
    messageSpan.innerHTML = message;

    const [toast] = document.getElementsByClassName('slide-in');
    const [toastBgColor] = document.getElementsByClassName('slide-in-content');
    toastBgColor.classList.add(type);
    toast.classList.add('show');
};

const removeToaster = (time) => {
    const toast = () => {
        const [toast] = document.getElementsByClassName('slide-in');
        toast.className = 'slide-in from-right';
    };
    setTimeout(toast, time)
};
