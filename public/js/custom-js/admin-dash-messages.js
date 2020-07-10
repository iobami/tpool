function toggleBack() {
  var x = document.getElementsByClassName("main-section");
  var messageToggle = document.getElementById("inbox-top");
  var messages = document.getElementById("right-side");

  if (window.screen.width > 768) {
    return;
  }
  for (var i = 0; i < x.length; i++) {
    if (x[i].style.display === "none") {
      x[i].style.display = "block";
      messageToggle.style.display = "none";
      messages.style.display = "none";
    } else {
      x[i].style.display = "none";
      messageToggle.style.display = "block";
      messages.style.display = "block";
    }
  }
}

//get chat-users
function getChatUsers() {
  const details = JSON.parse(window.localStorage.getItem('tpAuth'));
  const token = details.token;
  console.log(token);
  axios
    .get('https://api.lancers.app/v1/message/chat-users', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => {
      console.log(res.data.data);
      res.data.data.forEach((sth) => {
        showOutput(sth);
        let userId = sth.user_id;
        let fname = sth.first_name;
        let lname = sth.last_name;
        console.log(`empty: ${userId}`)
      })
    })
    .catch(err => console.log(err));
}

//set up method to get all messages
function getAllMessages() {
  console.log(window.localStorage.getItem('tpAuth'));
  const details = JSON.parse(window.localStorage.getItem('tpAuth'));
  const token = details.token;
  console.log(token);
  const senderId = details.userId;
  /*document.querySelector('chat-card').addEventListener('onclick', getAllReceiverId);

  function getAllReceiverId() {
    document.querySelector('p').dataset.userId;
  }*/
  const receiverId = 3 /*getAllReceiverId*/ ;
  console.log("sender" + senderId);
  console.log(token);
  console.log(receiverId);

  axios
    .get(`https://api.lancers.app/v1/message/${senderId}/${receiverId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => {
      console.log((res))
      res.data.data.forEach((sth) => {
        showOutput(sth);
        let message = sth.message;
        console.log("message: " + message);
        let receiverId = sth.receiver_id;
        let userIid = sth.user_id;

      })
    })
    .catch(err => console.log(err));

}

function showOutput(res) {
  document.getElementById('disp').innerHTML = `
  <div class="card d-flex flex-row mb-3  p-3 chat-card active-card" id="card1"
  onclick="toggleBack()">
  <div class=" mb-1 img-class">
      <img src="img/admin-dash-messages/dp-image.png" alt="img" class="dp-img ">
  </div>


  <div class="chat-info">
      <div class="content-top d-flex flex-row justify-content-between">
          <p class="contact-name mb-0 font-weight-bold">${res.first_name} ${res.last_name}</p>
          <p class="time-sent mb-0">4:56pm</p>
      </div>
      <div class="content-bottom d-flex flex-row ">
          <p class="mb-0 pr-2">
              <img src="img/admin-dash-messages/Read-tick.svg" alt="dp-img/" class="">
          </p>
          <p class="chat-content mb-1">${res.message}</p>
      </div>
  </div>
</div>
  `
}

document.body.addEventListener("load", getAllMessages);
document.body.addEventListener("load", getChatUsers);
document.getElementById('main-content').addEventListener("click", getChatUsers);
document.getElementById('main-content').addEventListener("click", getAllMessages);