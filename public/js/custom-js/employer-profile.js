const { getemployerdetails: [getemployerdetails] } = JSON.parse(localStorage.getItem("tpAuth"));
// console.log(getemployerdetails);
const pTags = document.querySelectorAll('p');
const h3Tags = document.querySelectorAll('h3');
const imgTags = document.querySelectorAll('img');
const spanTags = document.querySelectorAll('span');
const h6Tags = document.querySelectorAll('h6');

let [employerName] = h6Tags;
let [ ,companyLogoSpan ,] = spanTags;
let [ employerImage, ,companyLogo ,] = imgTags;
let [companyName] = h3Tags;
let [ , companyCategory, companyLocation, email, , description ] = pTags;

employerName.innerHTML = getemployerdetails.employer_name;
employerImage.src = getemployerdetails.employer_photo;
companyLogo.src = getemployerdetails.employer_photo;
companyLogoSpan.style.display = 'none';
companyName.innerHTML = getemployerdetails.Company_category.category_name;
companyCategory.innerHTML = getemployerdetails.Company_category.description;
companyLocation.innerHTML = getemployerdetails.employer_address;
email.innerHTML = getemployerdetails.employer_email;
description.innerHTML = getemployerdetails.Company_category.description;

