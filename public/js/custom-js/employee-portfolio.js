const userStory = JSON.parse(localStorage.getItem('user'));
console.log(userStory);
if (!userStory.token) {
    location.href = '/';
}

const userI = JSON.parse(atob(userStory.token.split(' ')[1]));
console.log(userI);

const qwerty = async() => {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const link = document.getElementById('link').value;
    const portfolioUrl = "https://api.lancers.app/v1/employee/portfolio";
    try {
        const { data } = await axios({
            method: 'POST',
            url: portfolioUrl,
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
                Authorization: `Bearer ${userStory.token}`,
            },
            data: // put the JSON.stringify here
                JSON.stringify({
                    "title": title,
                    "description": description,
                    "link": link,
                    "employee_id": `${userInformation.userTypeId}`
                })
        });
        console.log(data);
    }catch (e) {
        console.log(e.message);
      }
};

