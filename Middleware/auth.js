const jwt = require('jsonwebtoken');
module.exports = {
	auth: async (req, res, next) => {
		//get cookie items
		let token = {
			name: 'kkdfk',
			school: 'bolan'
		};
		//res.cookie('auth', token);
		const via = req.headers.cookie.split('; ');
		console.log(via);

		// const token = req.cookies.tokenauth;
		// if (!token) {
		// 	console.log('not seen');
		// } else {
		// 	console.log('seen cookies');
		// }
		//let verify the token
		if (!via) return res.send('access denied');
		try {
			const verify = jwt.verify(token, process.env.TOKEN_SECRET);
			if (!verify) return res.send('access denied');
			req.user = verify;
			next();
		} catch (error) {
			res.send('invalid token');
		}
	}
};
