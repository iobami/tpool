const axios = require('axios');

exports.logout = async (request, response) => {
    try {
        const { data } = await axios.get('https://api.lancers.app/v1/auth/logout');

        console.log(data.data);
    } catch (e) {
        console.log(`error occured ${e}`);
    }

    response.render('Pages/logout', {
        pageName: 'Logging Out'
    });
}
