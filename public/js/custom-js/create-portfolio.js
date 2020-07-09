

var userStory = JSON.parse(localStorage.getItem("user"));
// const portfolioForm = document.getElementById('modalRegisterForm');


// const userInfo = JSON.parse(atob(userInformation.token.split('.')[1]));

// portfolioForm.addEventListener('submit', (e) => {
//     e.preventDefault();
//     const title = document.getElementById('title').value
//     const description =document.getElementById('description').value
//     const link = document.getElementById('link').value

//     axios.post(`https://api.lancers.app/v1/employee/portfolio/${userStory.userId}`,{
//         title: title,
//         description: description,
//         link: link,
//         'Content-Type': `application/json; charset=UTF-8`,
//         headers:{
//             Authorization: `Bearer ${userInformation.token}`
//         }
//       })
//       .then(function (response) {
//                 console.log(response.data);
//               })
//               .catch(function (error) {
//                 console.log(error);
//               });
// })

// qwerty =() => {
//   const title = document.getElementById('title').value
//       const description =document.getElementById('description').value
//       const link = document.getElementById('link').value

// fetch(' https://cors-anywhere.herokuapp.com/https://api.lancers.app/v1/employee/portfolio',{
//   method:'POST',
//   headers:{
//     'Content-Type':"application/json;charset=UTF-8",
//     "User-Agent": "Developers Lancers",
//     Authorization:`Bearer ${userInformation.token}`,
//   },
//   body:JSON.stringify({"title": title,
//   "desscription":description,
//   "link": link,
//   "employee_id": '90545bd4-7ad3-416a-ae25-d84486311f3c'
// })
// })
// .then(res => res.json())
// .then(function (response){
//   console.log(response);
// })
// .catch(function (eror){
//   console.log(error)
// });
// }
const userToken =  `token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1sb2xhLm9zZW5pQGdtYWlsLmNvbSIsInVzZXJJZCI6IjQ3NzZlYjA4LTk2N2ItNGQ3MC1hNjMyLTVhZTZjOGNmYzczZSIsInVzZXJSb2xlIjoiUk9MLUVNUExPWUVFIiwidXNlclR5cGVJZCI6bnVsbCwiaWF0IjoxNTk0MjAxNjAxLCJleHAiOjE1OTQyODgwMDF9.ory9PsI9YKJU2rMoGWXymz25oOfkFlKVCTJCfxiOR6I"`
const qwerty = async () => {
  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;
  const link = document.getElementById('link').value;
  const portfolioUrl = `https://api.lancers.app/v1/employee/portfolio`;
  try {
    const { data } = await axios({
      method: 'POST',
      url: portfolioUrl,
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Authorization: userToken,
      },
      data: // put the JSON.stringify here
      JSON.stringify({"title": title,
  "description":description,
  "link": link,
  "employee_id": `${userStory.userId}`
})
    });
    console.log(data);
  } catch (e) {
    console.log(e.message);
  }
}; 














// document.getElementById('modalRegisterForm').addEventListener('submit', performPostRequest);

// function performPostRequest(e){
//     const title = document.getElementById('title').value
//     const description =document.getElementById('description').value
//     const link = document.getElementById('link').value
//     const headers = {
//         'Content-Type': 'application/json',
//   'Authorization':"token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1sb2xhLm9zZW5pQGdtYWlsLmNvbSIsInVzZXJJZCI6IjQ3NzZlYjA4LTk2N2ItNGQ3MC1hNjMyLTVhZTZjOGNmYzczZSIsInVzZXJSb2xlIjoiUk9MLUVNUExPWUVFIiwidXNlclR5cGVJZCI6bnVsbCwiaWF0IjoxNTk0MjAxNjAxLCJleHAiOjE1OTQyODgwMDF9.ory9PsI9YKJU2rMoGWXymz25oOfkFlKVCTJCfxiOR6I"
//     };

//     axios.post('https://api.lancers.app/v1/employee/portfolio', {
//         employee_id: '1',
//         title: title,
//         description: description,
//         link: link,
//         headers: headers
//       })
//       .then(function (response) {
//         console.log(response);
//       })
//       .catch(function (error) {
//         console.log(error);
//       });
      
//       e.preventDefault();

//       console.log('clicked')

// }