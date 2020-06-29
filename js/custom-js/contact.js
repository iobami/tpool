let contactForm = document.querySelector('#contact-form');
let clientName = document.querySelector('#clientName');
let clientEmail = document.querySelector('#clientEmail');
let messageSubject = document.querySelector('#messageSubject');
let message = document.querySelector('#message');
let errorMessage = document.querySelector("#error-message");
let successMessage = document.querySelector("#success-message");

if (contactForm) {
    contactForm.addEventListener("submit", onsubmit);
}

function onsubmit(e) {
    e.preventDefault();

    if (!clientName.value || !clientEmail.value || !messageSubject.value || !message.value) {
        console.log("error");
        errorMessage.innerHTML = "Please fill all the necessary details";
        errorMessage.style.background = "red";
        successMessage.style.display = "none";
        if (errorMessage.style.display == "none") {
            errorMessage.style.display = "block";

        }
        setTimeout(function () {
            errorMessage.style.display = "none";
        }, 2000);
    } else {
        console.log("yeah");
        successMessage.innerHTML = "Your message has been sent";
        successMessage.style.background = "green";
        if (successMessage.style.display == "none") {
            successMessage.style.display = "block";
        }
        setTimeout(function () {
            // $("#staticBackdrop").modal("hide");
            successMessage.style.display = "none";
        }, 2000);
        clientName.value = ""
        clientEmail.value = ""
        messageSubject.value = ""
        message.value = ""
        // window.location.replace('/employee_profile.html')
    }
}
