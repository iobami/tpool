const jwt = require('jsonwebtoken');
module.exports = {
	auth: async (req, res, next) => {
		//get cookie items
		const token = req.cookies.token;
		//let verify the token
		if (!token) return res.send('access denied');
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
