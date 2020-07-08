function logOutFunction() {
    localStorage.clear()
    // localStorage.setItem('tpAuth', '');
    window.location.replace('/');
}
logOutFunction();