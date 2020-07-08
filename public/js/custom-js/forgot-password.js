const forgotPasswordForm = document.querySelector('#forgot-password');

forgotPasswordForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = forgotPasswordForm.querySelector('input').value;

    fetch('https://api.lancers.app/v1/auth/forgot-password', {
        method: "POST",
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "User-Agent": "Developers Lancers",
        },
        body: JSON.stringify({email})
    })
        .then( res => res.json() )
        .then(data => console.log(data))
})