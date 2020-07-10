module.exports = {
    packages: (req, res) => {
        res.render('Pages/package', {pageName: 'Package'})
    },

    paymentSuccessModal: (req, res) => {
        res.render('Pages/payment-success-modal', {pageName: 'Payment Success Modal'})
    },

    paymentSuccess: (req, res) => {
        res.render('Pages/payment-success', {pageName: 'Payment Success Modal'})
    },


    pricePayment: (req, res) => {
        res.render('Pages/price-payment', {pageName: 'Price Payment'})
    }
}