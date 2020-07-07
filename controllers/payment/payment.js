module.exports = {
    paymentMethod: (req, res) => {
        res.render('Pages/payment-method', {pageName: 'Payment Method'})
    },

<<<<<<< HEAD
    paymentSuccess: (req, res) => {
        res.render('Pages/payment-success', {pageName: 'Payment Success'})
=======
    paymentSuccessModal: (req, res) => {
        res.render('Pages/payment-success-modal', {pageName: 'Payment Success Modal'})
>>>>>>> f4380ed775c0e45c8e840497681b8f92a2c40bd7
    }
}