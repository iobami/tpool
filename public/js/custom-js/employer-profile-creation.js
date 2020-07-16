// store data after image is read
let logoData;

const inputSize = () => {
  const individualNameContainer = document.getElementById(
    'individualNameContainer',
  );
  const organizationNameContainer = document.getElementById(
    'organizationNameContainer',
  );
  const genderContainer = document.getElementById('genderContainer');
  const countryContainer = document.getElementById('countryContainer');
  const orgPhoneContainer = document.getElementById('orgPhoneContainer');

  if (
    window.innerWidth < 576 &&
    individualNameContainer.style.display === 'block'
  ) {
    genderContainer.className = 'col-sm-6 col-6';
    countryContainer.className = 'col-sm-6 col-6';
    orgPhoneContainer.className = 'col-sm-12 col-12';
  }

  if (
    window.innerWidth < 576 &&
    organizationNameContainer.style.display === 'block'
  ) {
    countryContainer.className = 'col-sm-3 col-3';
    orgPhoneContainer.className = 'col-sm-9 col-9';
  }

  if (
    window.innerWidth >= 576 &&
    individualNameContainer.style.display === 'block'
  ) {
    genderContainer.className = 'col-sm-4 col-4';
    countryContainer.className = 'col-sm-3 col-3';
    countryContainer.style.paddingLeft = '0';
    orgPhoneContainer.className = 'col-sm-5 col-5';
    orgPhoneContainer.style.paddingLeft = '0';
  }

  if (
    window.innerWidth >= 576 &&
    organizationNameContainer.style.display === 'block'
  ) {
    countryContainer.className = 'col-sm-4 col-4';
    orgPhoneContainer.className = 'col-sm-8 col-8';
  }
};

const getEmployerType = () => {
  const employerType = document.getElementById('employer_type').value;
  const organizationNameContainer = document.getElementById(
    'organizationNameContainer',
  );
  const individualNameContainer = document.getElementById(
    'individualNameContainer',
  );
  const genderContainer = document.getElementById('genderContainer');
  const countryContainer = document.getElementById('countryContainer');
  const orgPhoneContainer = document.getElementById('orgPhoneContainer');

  const [firstName, lastName] = individualNameContainer.querySelectorAll(
    'input',
  );
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

    inputSize();
  } else {
    organizationNameContainer.style.display = 'block';
    individualNameContainer.style.display = 'none';
    genderContainer.style.display = 'none';
    countryContainer.style.paddingLeft = '';
    orgPhoneContainer.className = 'col-sm-8';
    orgName.setAttribute('required', true);
    firstName.removeAttribute('required');
    lastName.removeAttribute('required');

    inputSize();
  }
};

(function () {
  'use strict';
  window.addEventListener(
    'load',
    function () {
      // Get the forms we want to add validation styles to
      const forms = document.getElementsByClassName('needs-validation');
      // Loop over them and prevent submission
      Array.prototype.filter.call(forms, function (form) {
        form.addEventListener(
          'submit',
          async function (event) {
            const [empType, gender, , industryType] = document.querySelectorAll(
              'form select',
            );
            const [formData] = document.querySelectorAll(
              '#employerProfileForm',
            );
            const uploadBtn = document.getElementById('uploadProfile');
            const loader = document.getElementById('loader');

            const imageError = document.getElementById('noImage');
            imageError.style.display = 'none';

            let addValidation = true;

            if (form.checkValidity() === false) {
              event.preventDefault();
              event.stopPropagation();
            } else if (form.checkValidity()) {
              event.preventDefault();

              if (checkUploadedImage()) {
                imageError.style.display = 'block';
                return;
              }

              uploadBtn.style.display = 'none';
              loader.style.display = 'inline-block';

              try {
                const details = await getUserDetails(
                  empType.value,
                  gender.value,
                  industryType.value,
                  formData,
                );
                const response = await createProfile(details);
                formData.className = 'needs-validation';
                addValidation = false;

                if (response.status === 'success') {
                  toaster(`! ${response.message}`, 'success');
                  removeToaster(2000);
                  const redirect = () => {
                    window.location.replace('/employer/dashboard');
                    loader.style.display = 'none';
                    uploadBtn.style.display = 'inline-block';
                  };
                  setTimeout(redirect, 2000);
                } else {
                  console.log(response.message);
                  toaster(`! ${response.message}`, 'error');
                  removeToaster(4000);
                  loader.style.display = 'none';
                  uploadBtn.style.display = 'inline-block';
                }
              } catch (e) {
                console.log(e.message);
                toaster(`! ${e.message}`, 'error');
                removeToaster(4000);
              } finally {
                loader.style.display = 'none';
                uploadBtn.style.display = 'inline-block';
                formData.className = 'needs-validation';
                addValidation = false;
              }
            }

            if (addValidation) {
              form.classList.add('was-validated');
            }
            event.preventDefault();
          },
          false,
        );
      });
    },
    false,
  );
})();

const createProfile = async (userData) => {
  const profileUrl = '/employer/create';
  const [csrf] = document.getElementsByName('_csrf');

  try {
    axios.defaults.xsrfCookieName = 'csrftoken';
    axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';

    const { data } = await axios({
      method: 'POST',
      url: profileUrl,
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        'csrf-token': csrf.value,
      },
      data: userData,
    });

    return data;
  } catch (e) {
    return e.response.data;
  }
};

const getCountryName = (countryObject, countryCode) => {
  for (const [key, value] of Object.entries(countryObject)) {
    if (countryCode === key) return value;
  }
};

const getUserDetails = (empType, gender, industryType, formData) => {
  const inputTags = formData.querySelectorAll('#employerProfileForm input');
  const [description] = formData.querySelectorAll('textarea');

  const [
    ,
    ,
    orgName,
    ,
    ,
    orgEmail,
    orgPhone,
    orgWebsite,
    orgAddress,
  ] = inputTags;
  const [btn] = document.querySelectorAll('.flagstrap button');
  const [selectedLeft] = btn.querySelectorAll('span');
  const country = getCountryName(countries, selectedLeft.innerText.trim());
  console.log(country);

  if (empType.toLowerCase() === 'company') {
    return getFormData({
      photo: logoData,
      employerType: empType,
      employerName: orgName.value,
      companyCategoryId: industryType,
      description: description.value,
      gender: null,
      companyCountry: country,
      companyPhone: orgPhone.value,
      companyEmail: orgEmail.value,
      companyAddress: orgAddress.value,
      website: orgWebsite.value,
    });
  } else {
    // return employer data
    const [
      ,
      ,
      ,
      firstName,
      lastName,
      orgEmail,
      orgPhone,
      orgWebsite,
      orgAddress,
    ] = inputTags;

    return getFormData({
      photo: logoData,
      employerType: empType,
      organizationName: null,
      employerName: `${firstName.value} ${lastName.value}`,
      companyCategoryId: industryType,
      description: description.value,
      gender: gender,
      companyCountry: country,
      companyPhone: orgPhone.value,
      companyEmail: orgEmail.value,
      companyAddress: orgAddress.value,
      website: orgWebsite.value,
    });
  }
};

const getFormData = ({
  photo,
  employerType,
  organizationName,
  employerName,
  companyCategoryId,
  description,
  gender,
  companyCountry,
  companyPhone,
  companyEmail,
  companyAddress,
  website,
}) => {
  const fileUploadData = new FormData();
  fileUploadData.append('photo', photo);
  fileUploadData.append('employer_type', employerType);
  fileUploadData.append('employer_name', employerName);
  fileUploadData.append('company_category_id', companyCategoryId);
  fileUploadData.append('description', description);
  fileUploadData.append('sex', gender);
  fileUploadData.append('employer_country', companyCountry);
  fileUploadData.append('employer_phone', companyPhone);
  fileUploadData.append('employer_email', companyEmail);
  fileUploadData.append('employer_address', companyAddress);
  fileUploadData.append('website', website);

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

  const [desc] = document.querySelectorAll('#profile .small');
  desc.style.color = '#A0A0A0';

  const [imageFile] = files;
  const fileNameArray = imageFile.name.split('.');
  const fileExtension = fileNameArray[fileNameArray.length - 1].toLowerCase();
  if (['jpg', 'jpeg', 'png'].includes(fileExtension) === false) {
    desc.style.color = '#dc3545';
    labelText('! File not supported', 'error');
    $('#profile-image-preview').attr('src', '/img/profile-image.jpeg');
    return;
  }

  if (files.length) {
    labelText(imageFile.name);

    const reader = new FileReader();

    reader.onload = function changeFile(e) {
      $('#profile-image-preview').attr('src', e.target.result);
    };

    reader.readAsDataURL(imageFile);
  }

  const imageError = document.getElementById('noImage');
  imageError.style.display = 'none';

  logoData = imageFile;
};

const labelText = (value, error) => {
  const labelText = document.getElementById('logo');
  labelText.value = value;
  if (error) {
    labelText.style.color = '#dc3545';
  } else {
    labelText.style.color = '#383838';
  }
};
