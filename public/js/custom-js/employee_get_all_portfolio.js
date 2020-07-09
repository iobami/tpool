// ** This javascript file is in sync with the employee-profile.html in the src folder.

let req_info = {
    method: "get",
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'User-Agent': 'Developers Lancers',
    },
    mode: "no-cors"
}

// const Employee_ID = document.getElementById('myForm').elements[3].value;
let API_URL = `https://api.lancers.app/v1/employee/portfolios/:${Employee_ID}`

async function GetPortfolio() {
    const response = await fetch(API_URL, req_info);
    const data = await response.json();
    console.log(data)
    var y = document.getElementsByClassName("no-portfolio")
    var portfolio_content = JSON.stringify(data)
    portfolio_content.forEach(function (x) {
        var entry = "<div>" + x.message + "</div>"
        document.getElementById("hidden_portfolio").innerHTML += entry
    })
        .catch(err => console.log('Cannot fetch Portfolio', err))
    if (portfolio_content) {
        y.style.display === 'none';
    }
    else {
        y.style.display === 'block';
    }
}

// Function to toggle between showing and hiding the Portfolio Section
function show_Portfolio() {
    var x = document.getElementById("hidden_portfolio")
    if (x.style.display === 'none') {
        x.style.display = "block";
    } else {
        x.style.display = 'none';
    }
}
