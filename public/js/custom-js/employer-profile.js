// const pTags = document.querySelectorAll('p');
// const h3Tags = document.querySelectorAll('h3');
// const imgTags = document.querySelectorAll('img');
// const spanTags = document.querySelectorAll('span');
// const h6Tags = document.querySelectorAll('h6');

// let [employerName] = h6Tags;
// let [ ,companyLogoSpan ,] = spanTags;
// let [ employerImage, ,companyLogo ,] = imgTags;
// let [companyName] = h3Tags;
// let [ , companyCategory, companyLocation, email, , description ] = pTags;

// employerName.innerHTML = getemployerdetails.employer_name;
// employerImage.src = getemployerdetails.employer_photo;
// companyLogo.src = getemployerdetails.employer_photo;
// companyLogoSpan.style.display = 'none';
// companyName.innerHTML = getemployerdetails.Company_category.category_name;
// companyCategory.innerHTML = getemployerdetails.Company_category.description;
// companyLocation.innerHTML = getemployerdetails.employer_address;
// email.innerHTML = getemployerdetails.employer_email;
// description.innerHTML = getemployerdetails.Company_category.description;

const saveProfile = async () => {

    const getEditProfileModalData = document.querySelectorAll('#updateProfile input');
    const getIndustryType = document.querySelectorAll('#updateProfile select');
    let [companyName, companyPhone, companyCountry, companyLocation] = getEditProfileModalData;
    const updateProfileBtn = document.getElementById('updateProfileButton');
    const profileLoaderBtn = document.getElementById('profileLoader');

    try {

        updateProfileBtn.style.display = 'none';
        profileLoaderBtn.style.display = 'block';

        const updateProfileUrl = `/employer/update/individual`;

        const fileUploadData = new FormData();
        fileUploadData.append('employer_name', companyName.value);
        fileUploadData.append('employer_country', companyCountry.value);
        fileUploadData.append('employer_address', companyLocation.value);
        fileUploadData.append('employer_phone', companyPhone.value);
        fileUploadData.append('compnay_category_id', getIndustryType.value);

        const [csrf] = document.getElementsByName('_csrf');

        const { data } = await axios({
            method: 'PUT',
            url: updateProfileUrl,
            headers: {
              "Content-Type": "application/json; charset=UTF-8",
              'csrf-token': csrf.value,
            },
            data: fileUploadData
          });

          console.log(data);
          if (data.status === 'success') {
              toaster(data.message, 'success');
              removeToaster(4000);
              setTimeout(reLoad, 2000);
              $('#profilepopup').modal('hide');
          } else {
            toaster(data.message, 'error');
            removeToaster(4000);
          }

          updateProfileBtn.style.display = 'block';
          profileLoaderBtn.style.display = 'none';
    } catch (e) {
        console.log(e.response.data);
        toaster(e.response.data.message, 'error');
        removeToaster(4000);
        updateProfileBtn.style.display = 'block';
        profileLoaderBtn.style.display = 'none';
    }
};

const updateSocial = (title, input) => {
    let formTitle = document.getElementById('exampleModalLongTitle');
    let updateInput = document.getElementById('updateInput');
    formTitle.innerHTML = title;
    updateInput.value = input;
    $('#socialAccount').modal('show');
};

const saveSocials = async () => {

    let formTitle = document.getElementById('exampleModalLongTitle').innerHTML;
    const updateInput = document.getElementById('updateInput').value;
    const updateSocialsBtn = document.getElementById('updateSocials');
    const updateLoaderBtn = document.getElementById('updateLoader');
    formTitle = formTitle.toLowerCase();

    const getEditProfileModalData = document.querySelectorAll('#updateProfile input');
    const getIndustryType = document.querySelectorAll('#updateProfile select');
    let [companyName, companyPhone, companyCountry, companyLocation] = getEditProfileModalData;

    const fileUploadData = new FormData();
    fileUploadData.append('employer_name', companyName.value);
    fileUploadData.append('employer_country', companyCountry.value);
    fileUploadData.append('employer_address', companyLocation.value);
    fileUploadData.append('employer_phone', companyPhone.value);
    fileUploadData.append('compnay_category_id', getIndustryType.value);
    fileUploadData.append(`${formTitle}`, `${updateInput}`);

    try {

        updateSocialsBtn.style.display = 'none';
        updateLoaderBtn.style.display = 'block';

        const updateProfileUrl = `/employer/update/individual`;

        const [csrf] = document.getElementsByName('_csrf');

        const { data } = await axios({
            method: 'PUT',
            url: updateProfileUrl,
            headers: {
              "Content-Type": "application/json; charset=UTF-8",
              'csrf-token': csrf.value,
            },
            data: fileUploadData
          });

          console.log(data);
          if (data.status === 'success') {
              toaster(data.message, 'success');
              removeToaster(2000);
              setTimeout(reLoad, 1000);
              $('#socialAccount').modal('hide');
          }

          console.log(data.message);
          updateLoaderBtn.style.display = 'none';
          updateSocialsBtn.style.display = 'block';

    } catch (e) {
        console.log(e.response.data);
        updateLoaderBtn.style.display = 'none';
        updateSocialsBtn.style.display = 'block';
    }
};

const showImageModal = () => {
    $('#editImageModalCenter').modal('show');
};

const reLoad = () => {
    window.location.reload();
};

const saveImage = async () => {

    let imageData = document.getElementById('profileUpdateImage');
    const updateProfileBtn = document.getElementById('saveImageButton');
    const profileLoaderBtn = document.getElementById('saveImageLoader');
    ([imageData] = imageData.files);

    try {

        updateProfileBtn.style.display = 'none';
        profileLoaderBtn.style.display = 'block';

        const updateProfileUrl = `/employer/update`;

        const fileUploadData = new FormData();
        fileUploadData.append('photo', imageData);

        const [csrf] = document.getElementsByName('_csrf');

        const { data } = await axios({
            method: 'PUT',
            url: updateProfileUrl,
            headers: {
              "Content-Type": "application/json; charset=UTF-8",
              'csrf-token': csrf.value,
            },
            data: fileUploadData
          });

          if (data.status === 'success') {
              toaster(data.message, 'success');
              removeToaster(4000);
              setTimeout(reLoad, 2000);
          } else {
            toaster(data.message, 'success');
            removeToaster(4000);
          }

          updateProfileBtn.style.display = 'block';
          profileLoaderBtn.style.display = 'none';
          $('#editImageModalCenter').modal('hide');
    } catch (e) {
        console.log(e.response.data);
        toaster(e.response.data.message, 'error');
        removeToaster(4000);
        updateProfileBtn.style.display = 'block';
        profileLoaderBtn.style.display = 'none';
        $('#editImageModalCenter').modal('hide');
    }
};

const readImage = () => {
    const imageData = document.getElementById('profileUpdateImage');
    const files = imageData.files;

    if (!files.length) return;

    // const [desc] = document.querySelectorAll('#profile .small');
    // desc.style.color = '#A0A0A0';

    const [imageFile] = files;
    const fileNameArray = imageFile.name.split('.');
    const fileExtension = fileNameArray[fileNameArray.length - 1].toLowerCase();
    if (['jpg', 'jpeg', 'png'].includes(fileExtension) === false) {
        // desc.style.color = '#dc3545';        
        labelText('! File not supported', 'error');
        $('#profile-image-preview').attr('src', '/img/profile-image.jpeg');
        return;
    }

    if (files.length) {
        labelText(imageFile.name);

        const reader = new FileReader();

        reader.onload = function changeFile(e) {
            $('#img-preview')
                .attr('src', reader.result);
        };

        reader.readAsDataURL(imageFile);
    }

    // const imageError = document.getElementById('noImage');
    // imageError.style.display = 'none';

    logoData = imageFile;
};

const truncateString = (str, num) => {

    if (str.length <= num) {
        return str
    }

    return `${str.slice(0, num)}...`;
};

const labelText = (value, error) => {
    const [labelText] = document.getElementsByClassName('custom-file-label');
    let newValue;

    if ((window.innerWidth >= 366) && (window.innerWidth <= 450)) {
        newValue = truncateString(value, 11);
        labelText.innerText = newValue;
    } else if (window.innerWidth <= 365) {
        newValue = truncateString(value, 9);
        labelText.innerText = newValue;
    } else {
        newValue = truncateString(value, 18);
        labelText.innerText = newValue;
    }


    if (error) {
        labelText.style.color = '#dc3545';
    } else {
        labelText.style.color = '#383838';
    }
    // labelText.innerText = value
};

const showCompanyInfoModal = () => {
    $('#companyInfoModal').modal('show');
};

const showDescModal = () => {
    $('#descModal').modal('show');
};

const saveDescription = async () => {

    const updateInput = document.getElementById('descText').value;
    console.log(updateInput);
    const updateSocialsBtn = document.getElementById('updateDesc');
    const updateLoaderBtn = document.getElementById('descLoader');

    const getEditProfileModalData = document.querySelectorAll('#updateProfile input');
    const getIndustryType = document.querySelectorAll('#updateProfile select');
    let [companyName, companyPhone, companyCountry, companyLocation] = getEditProfileModalData;

    const fileUploadData = new FormData();
    fileUploadData.append('employer_name', companyName.value);
    fileUploadData.append('employer_country', companyCountry.value);
    fileUploadData.append('employer_address', companyLocation.value);
    fileUploadData.append('employer_phone', companyPhone.value);
    fileUploadData.append('compnay_category_id', getIndustryType.value);
    fileUploadData.append('description', `${updateInput}`);

    try {

        updateSocialsBtn.style.display = 'none';
        updateLoaderBtn.style.display = 'block';

        const updateProfileUrl = `/employer/update/individual`;

        const [csrf] = document.getElementsByName('_csrf');

        const { data } = await axios({
            method: 'PUT',
            url: updateProfileUrl,
            headers: {
              "Content-Type": "application/json; charset=UTF-8",
              'csrf-token': csrf.value,
            },
            data: fileUploadData
          });

          console.log(data);
          if (data.status === 'success') {
              toaster(data.message, 'success');
              removeToaster(2000);
              setTimeout(reLoad, 1000);
              $('#socialAccount').modal('hide');
          }

          console.log(data.message);
          updateLoaderBtn.style.display = 'none';
          updateSocialsBtn.style.display = 'block';

    } catch (e) {
        console.log(e.response.data);
        updateLoaderBtn.style.display = 'none';
        updateSocialsBtn.style.display = 'block';
    }
};
