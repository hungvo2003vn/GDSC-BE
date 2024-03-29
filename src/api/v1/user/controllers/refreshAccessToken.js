const refreshAccessToken = async (req, res, next) => {
	try {
		const {refreshToken} = req.body
		const data = await req.userService.refreshAccessToken({
			refreshToken
		})
		res.status(200).json({data})
	} catch (err) {
		next(err)
	}
}

export default refreshAccessToken