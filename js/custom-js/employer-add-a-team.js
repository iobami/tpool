const memberBox = document.querySelector(".member-box-mobile");

if (window.innerWidth <= 500) {
	memberBox.innerHTML = `<p class="center">Current team members</p>`;
}
