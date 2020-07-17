// const userStory = JSON.parse(localStorage.getItem("tpAuth"));
// console.log(userStory);
// if (!userStory.token) {
//   location.href = "/";
// }

// const token = userStory.token;

// const qwerty = async () => {
//   const title = document.getElementById("title").value;
//   const description = document.getElementById("description").value;
//   const link = document.getElementById("link").value;
//   const portfolioUrl = "https://api.lancers.app/v1/employee/portfolio";
//   try {
//     const { data } = await axios({
//       method: "POST",
//       url: portfolioUrl,
//       headers: {
//         "Content-Type": "application/json; charset=UTF-8",
//         Authorization: "Bearer " + token,
//       },
//       // put the JSON.stringify here
//       data: JSON.stringify({
//         title: title,
//         description: description,
//         link: link,
//         employee_id: `${userInformation.userTypeId}`,
//       }),
//     });
//     console.log(data);
//   } catch (e) {
//     console.log(e.message);
//   }
// };

let formTitle = document.querySelector('.p-title');
let formDesc = document.querySelector('.p-desc');
let formLink = document.querySelector('.p-link');

function editPortfolio(title, desc, link) {
  formTitle.setAttribute('value', title);
  formDesc.setAttribute('value', desc);
  formLink.setAttribute('value', link);
}

function deletePortfolio(id) {
  console.log(id);
}
