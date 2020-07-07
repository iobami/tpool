module.exports = {
    paymentMethod: (req, res) => {
        res.render('Pages/payment-method', {pageName: 'Payment Method'})
    },

    paymentSuccess: (req, res) => {
        res.render('Pages/payment-success', {pageName: 'Payment Success'})
    }
}