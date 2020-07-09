const create_portfolio_url = 'https://api.lancers.app/v1/employee/portfolio';

let myForm = document.getElementById('myForm');
let create = document.getElementById('create');

let Title = document.getElementById('myForm').elements[0].value;
let Description = document.getElementById('myForm').elements[1].value;
let Link = document.getElementById('myForm').elements[2].value;
let Employee_ID = document.getElementById('myForm').elements[3].value;

console.log(Title, Description, Link, Employee_ID);

let employee_signup = {
	"firstName": 'Ikenna',
	"lastName": 'Oyiih',
	"email": 'heartchiks@yahoo.com',
	"phoneNo": '08064383179',
	"password": 'Asdfghjkl#5'
};

let employee_login = {
	"email": 'heartchiks@yahoo.com',
	"password": 'Asdfghjkl#5'
};

let employee_create_portfolio = {
	"title": Title,
	"description": Description,
	"link": Link,
	"employee_id": Employee_ID
};

// function to create a portfolio
function createPortfolio() {
	fetch('https://api.lancers.app/v1/auth/employee-login', {
		method: 'post',
		headers: { 'Content-Type': 'application/json', 'User-Agent': 'Developers Lancers' },
		body: JSON.stringify(employee_login)
	})
		.then(response => response.json())
		.then(response => {
			if (response) {
				const bearer = 'Bearer ' + response.data.token
				console.log(bearer)
				fetch(create_portfolio_url, {
					method: 'POST',
					headers: {
						'Content-type': 'application/json',
						'User-Agent': 'Developers Lancers',
						'Authorization': bearer
					},
					body: JSON.stringify(employee_create_portfolio)
				})
					.then(response => response.json())
					.then(response => {
						const data = response.data;
						console.log(data);
					})
					.catch((err) => console.log(err));
			}
		})
}


// onlick of the submit button run the createPortfolio function
create.addEventListener('click', (e) => {
	e.preventDefault();
	console.log(Title, Description, Link, Employee_ID);
});
