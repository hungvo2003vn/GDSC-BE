import jwt from 'jsonwebtoken'
import {} from 'dotenv/config'
import db from '#~/config/firebase.js'

const access_token_key = process.env.ACCESS_TOKEN_KEY
const access_token_expires_time = process.env.ACCESS_TOKEN_EXPIRES_TIME
const refresh_token_key = process.env.REFRESH_TOKEN_KEY
const refresh_token_expires_time = process.env.REFRESH_TOKEN_EXPIRES_TIME

async function refreshAccessToken({refreshToken}) {
    try {
        var {user_id, session_id} = jwt.verify(refreshToken, refresh_token_key);
        const accessToken = jwt.sign(
            {
                user_id,
                session_id
            },
            access_token_key,
            {
                expiresIn: access_token_expires_time,
            }
        );
		console.log({user_id, session_id})

        // Query the Token collection for a document with matching user_id and session_id
        const tokenQuerySnapshot = await db.collection("Token")
            .where("user_id", "==", user_id)
            .where("session_id", "==", session_id)
            .get();

        // Check if the document exists
        if (tokenQuerySnapshot.empty) {
            return Promise.reject({
                status: 404,
                message: 'Token document not found. The refresh token might be invalid or expired.'
            });
        }

        // Update the accessToken field in the found document
        const tokenDocRef = tokenQuerySnapshot.docs[0].ref;
        await tokenDocRef.update({
            accessToken: accessToken
        });

        return {accessToken, refreshToken};
    } catch (err) {
        return Promise.reject({
            status: 401,
            message: 'Unauthorized. The refresh token might be invalid or expired.'
        });
    }
}

export default refreshAccessToken;
