import db from '#~/config/firebase.js'

import bcrypt from 'bcrypt'
async function register({
	email,
	password,
	role,
	firstName,
	lastName,
    phoneNumber
}) {

	//check input
	if(!email || !password || !role || !firstName || !lastName){
		return Promise.reject({
			status: 403,
			message: 'Missing email, password, role, firstName or lastName!',
		})
	}

	const userRecord = await db.collection("User").where("email", "==", email).get()
	if (!userRecord.empty) {
		return Promise.reject({
			status: 403,
			message: 'The email has been registered',
		})
	} 

	const saltRounds = 10
	const hashedPassword = await bcrypt.hash(password, saltRounds)

	if(role != "police" && role != "user"){
		return Promise.reject ({
			status: 403,
			message: `User registered failed!. Expected police or user but got <${role}>`,
		})
	}

	const newUser =  await db.collection("User").add({
		email,
		password: hashedPassword,
		firstName,
		lastName,
		phoneNumber: phoneNumber || null,
		role
	})

	return {
		"message": "User registered successfully!",
		"user_id": newUser.id
	}
	
}
export default register