import jwt from 'jsonwebtoken'
import {} from 'dotenv/config'
import {v4 as uuidv4} from 'uuid'
import db from '#~/config/firebase.js'

const access_token_key = process.env.ACCESS_TOKEN_KEY
const access_token_expires_time = process.env.ACCESS_TOKEN_EXPIRES_TIME
const refresh_token_key = process.env.REFRESH_TOKEN_KEY
const refresh_token_expires_time = process.env.REFRESH_TOKEN_EXPIRES_TIME

async function createTokens(id) {
	const session_id = uuidv4()
	const accessToken = jwt.sign(
		{
			user_id: id,
			session_id,
		},
		access_token_key,
		{
			expiresIn: access_token_expires_time,
		}
	)
	const refreshToken = jwt.sign(
		{
			user_id: id,
			session_id,
		},
		refresh_token_key,
		{
			expiresIn: refresh_token_expires_time,
		}
	)
	await db.collection("Token").add({
		accessToken,
		refreshToken,
		user_id: id, //co cam giac k can user_id
		session_id,
	})

	return {
		accessToken,
		refreshToken
	}
}

export default createTokens