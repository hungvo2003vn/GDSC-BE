import bcrypt from 'bcrypt'
import db from '#~/config/firebase.js'
import createTokens from './createToken.js'

async function login({email, password}) {

    //check input
	if(!email || !password){
		return Promise.reject({
			status: 403,
			message: 'Missing email, password!',
		})
	}

    const userRecord = await db.collection("User").where("email", "==", email).get()
    if (userRecord.empty) {
		return Promise.reject({
			status: 401,
			message: 'Email not correct',
		})
	} else{
        const userData = userRecord.docs[0].data()
        const isPasswordRight= await bcrypt.compare(password, userData.password)
        if(isPasswordRight)
        {
            return await createTokens(userRecord.docs[0].id)
        }
        else{
            return Promise.reject({
                status: 404,
                message: 'Password not correct',
            })
        }
    }
}

export default login