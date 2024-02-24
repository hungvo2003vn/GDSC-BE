import UserService from "../services/index.js";

const getUserInfo = async (req, res, next) => {
    try {
        const data = req.user
        res.status(200).json({data})
    } catch (err) {
        next(err)
    }
}

export default getUserInfo