function toggleBack() {
  var x = document.getElementsByClassName("main-section");
  var messageToggle = document.getElementById("inbox-top");
  var messages = document.getElementById("right-side");

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

// var tab1 = document.getElementById("card1");
// var mainSection = document.getElementsByClassName("chat-scroll-view");
// var messageToggle = document.getElementById("inbox-top");
// var messages = document.getElementById("right-side");
// tab1.onclick = function () {
//   mainSection.style.display = "none";
//   messages.style.display = "block";
//   messageToggle.style.display = "block";
// };
