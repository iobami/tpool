module.exports = {
    paymentMethod: (req, res) => {
        res.render('Pages/payment-method', {pageName: 'Payment Method'})
    },

    paymentSuccessModal: (req, res) => {
        res.render('Pages/payment-success-modal', {pageName: 'Payment Success Modal'})
    }
}