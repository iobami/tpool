function logOutFunction() {
    localStorage.clear();
    $('.toast').toast('show');
    // localStorage.setItem('tpAuth', '');
    window.location.replace('/');
}
$('.toast').toast({
    delay: 1200,
});
logOutFunction();
