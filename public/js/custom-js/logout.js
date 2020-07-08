function logOutFunction() {
    localStorage.setItem('tpAuth', '');
    window.location.replace('/');
}
logOutFunction();