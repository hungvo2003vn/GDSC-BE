import jwt from 'jsonwebtoken'
import {} from 'dotenv/config'
import db from '#~/config/firebase.js'

const access_token_key = process.env.ACCESS_TOKEN_KEY

async function getUserInfo(accessToken) {
    try {
        // Verify the access token
        const { user_id, session_id } = jwt.verify(accessToken, access_token_key)

        // Fetch user data from Firestore
        const userSnapshot = await db.collection("User").doc(user_id).get()

        // Check if the user exists
        if (!userSnapshot.exists) {
            return Promise.reject({ status: 404, message: 'User not found!' })
        }

        // Extract user data excluding password
        const userData = userSnapshot.data()
        delete userData.password

        return {
            id: userSnapshot.id,
            ...userData
        }
    } catch (err) {
        return Promise.reject({ status: 401, message: 'Unauthorized' })
    }
}

export default getUserInfo
