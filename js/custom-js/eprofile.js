const editProfileForm = document.querySelector("#edit-profile");
const firstName = document.querySelector("#first-name");
const lastName = document.querySelector("#last-name");
const email = document.querySelector("#email");
// const location = document.querySelector('#location')
// const track = document.querySelector('#track')
const cv = document.querySelector("#cv");
const backend = document.querySelector("backend");
const frontend = document.querySelector("frontend");
const mobile = document.querySelector("mobile");
const design = document.querySelector("design");

const errorMessage = document.querySelector("#error-message");
const successMessage = document.querySelector("#success-message");

if (editProfileForm) {
    editProfileForm.addEventListener("submit", onsubmit);
}

function onsubmit(e) {
    e.preventDefault();

    if (!firstName.value || !lastName.value || !email.value) {
        console.log("error");
        errorMessage.innerHTML = "Please fill all the necessary details";
        if (errorMessage.style.display == "none") {
            errorMessage.style.display = "block";
        }
        setTimeout(function () {
            errorMessage.style.display = "none";
        }, 2000);
    } else {
        console.log("yeah");
        errorMessage.innerHTML = "Your details are being uploaded";
        if (successMessage.style.display == "none") {
            successMessage.style.display = "block";
        }
        setTimeout(function () {
            $("#staticBackdrop").modal("hide");
            successMessage.style.display = "none";
        }, 2000);
        // window.location.replace('/employee_profile.html')
    }
}

Filevalidation = () => {
    const fi = document.getElementById("file");
    const size = document.querySelector('#size');
    const fileMessage = document.querySelector('#file-message');
    // Check if any file is selected.
    if (fi.files.length > 0) {
        for (let i = 0; i <= fi.files.length - 1; i++) {
            const fsize = fi.files.item(i).size;
            const file = Math.round(fsize / 1024);
            // The size of the file.
            if (file >= 2048) {
                fileMessage.innerHTML = 'File too Big, please select a file less than 600kb '
                setTimeout(function () {
                  
                    fileMessage.style.display = "none";
                }, 4000);
                // alert("File too Big, please select a file less than 4mb");
            } else if (file < 550) {
                fileMessage.innerHTML = 'File too small, please select a file greater than 2mb'
                // alert("File too small, please select a file greater than 2mb");
                setTimeout(function () {

                    fileMessage.style.display = "none";
                }, 4000);
            } else {
                document.getElementById("size").innerHTML = "<b>" + file + "</b> KB";
            }
        }
    }
};

