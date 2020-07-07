module.exports = {
    paymentMethod: (req, res) => {
        res.render('Pages/payment-method', {pageName: 'Payment Method'})
    }
}