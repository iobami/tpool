const token = JSON.parse(localStorage.getItem('tpAuth'));
console.log(token);
if (!token) {
	location.href = '/';
}
(function () {
	'use strict';
	const response = JSON.parse(atob(token.token.split('.')[1]));
	console.log(response.userTypeId);
	// Redirecting
	if (response.userTypeId !== null) {
		// Redirect to employer profile creation page
		window.location.href = '/employer-dashboard';
	}
})();
