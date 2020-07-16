// const employeeProfileCreationForm = document.querySelector(
//   '#employeeProfileCreation',
// );
// const userType = document.querySelector('#userType');
// const hngId = document.querySelector('#hngId');

// const userInformation = JSON.parse(localStorage.getItem('tpAuth'));

// const userInfo1 = JSON.parse(atob(userInformation.token.split('.')[1]));
// const { userTypeId, userRole } = userInfo1;

// const [navBar] = document.getElementsByClassName('navbar-brand');

// if (userRole === 'ROL-EMPLOYEE') {
//   if (userTypeId) {
//     navBar.href = '/employee-dashboard';
//   } else {
//     navBar.href = '/employee-profileCreation';
//   }
// }

// if (userRole === 'ROL-EMPLOYER') {
//   if (userTypeId) {
//     navBar.href = '/employer-dashboard';
//   } else {
//     navBar.href = '/employer-create-profile';
//   }
// }

// userType.addEventListener('click', (e) => {
//   for (let i = 0, len = userType.options.length; i < len; i++) {
//     opt = userType.options[i];
//     if (opt.selected === true) {
//       if (opt.value == 'hng') {
//         hngId.removeAttribute('disabled');
//       } else {
//         hngId.setAttribute('disabled', true);
//       }
//     }
//   }
// });

// const employeeAvailability = document.querySelector('#employeeAvailability');
// function getAvailability() {
//   let opt;
//   for (let i = 0, len = employeeAvailability.options.length; i < len; i++) {
//     opt = employeeAvailability.options[i];
//     if (opt.selected === true) {
//       break;
//     }
//   }
//   return opt.innerText;
// }
// // employeeAvailability.addEventListener('click', (e) => {
// //    console.log(getAvailability())
// // })

// const userInfo = JSON.parse(atob(userInformation.token.split('.')[1]));

// employeeProfileCreationForm.addEventListener('submit', (e) => {
//   e.preventDefault();
//   const employeeImage = document.querySelector('#employeeImg').value;
//   const employeeFirstName = document.querySelector('#employeeFirstName').value;
//   const employeeLastName = document.querySelector('#employeeLastName').value;
//   const userTypeName = document.querySelector('#userType').value;
//   const hngIdValue = document.querySelector('#hngId').value;
//   const employeeAge = document.querySelector('#employeeAge').value;
//   const employeeAvailability = getAvailability();
//   const dob = document.querySelector('#employeeDOB').value;
//   const employeeCv = document.querySelector('#employeeCV').value;
//   const userPhoneNumber = document.querySelector('#employeePhone').value;
//   const { userId } = userInfo;
//   // userId = 'eee5269b-f4e7-4058-bcf5-77b4b2834c97'

//   console.log(employeeImage);

//   fetch('https://api.lancers.app/v1/employee/profile', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json; charset=UTF-8',
//       'User-Agent': 'Developers Lancers',
//       Authorization: `Bearer ${userInformation.token}`,
//     },
//     body: JSON.stringify({
//       firstName: employeeFirstName,
//       lastName: employeeLastName,
//       userType: userTypeName,
//       hngId: hngIdValue,
//       age: employeeAge,
//       phoneNo: userPhoneNumber,
//       pictureUrl: employeeImage,
//       avaliability: employeeAvailability,
//       dateOfBirth: dob,
//       employeeCv,
//       userId,
//     }),
//   })
//     .then((res) => res.json())
//     .then((data) => console.log(data));
// });

const userTypee = document.querySelector('.userTypee');
const HNGID = document.querySelector('.HNGID');
const hngIdLabel = document.querySelector('.hngIdLabel');

userTypee.addEventListener('change', () => {
  if (userTypee.value === 'non-hng') {
    HNGID.disabled = true;
    HNGID.classList.remove('visibility');
    HNGID.setAttribute('value', '');
    // hngIdLabel.classList.remove('visibility');
  } else if (userTypee.value === 'hng') {
    HNGID.disabled = false;
    HNGID.classList.add('visibility');
    // hngIdLabel.classList.add('visibility');
  } else {
    HNGID.disabled = true;
    HNGID.classList.remove('visibility');
    HNGID.setAttribute('value', '');
    // hngIdLabel.classList.remove('visibility');
  }
});

const fileInput = document.querySelector('.profile-picture-file');

fileInput.addEventListener('change', (event) => {
  const profilePicture = document.querySelector('.profile-picture');
  profilePicture.setAttribute('src', fileInput.files[0].name);
  //   console.log(fileInput.value);
  console.log(fileInput.files[0].name);
});
