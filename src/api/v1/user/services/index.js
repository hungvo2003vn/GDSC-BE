import login from "./login.js"
import register from "./register.js"
import createTokens from "./createToken.js"
import refreshAccessToken from "./refreshAccessToken.js"
import getUserInfo from "./getUserInfor.js"

class UserService {
    userInfo=null
    login=login
    register=register
    createTokens = createTokens
	refreshAccessToken = refreshAccessToken
	getUserInfo=getUserInfo
}

export default UserService