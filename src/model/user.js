import db from '../config/firebase.js';

async function getAllUsers() {
    try {
        const querySnapshot = await db.collection("User").get();
        const users = [];
        querySnapshot.forEach((doc) => {
            users.push({ id: doc.id, ...doc.data() });
        });
        console.log(users);
    } catch (error) {
        console.error("Error getting users: ", error);
        throw error;
    }
}

export default getAllUsers;
