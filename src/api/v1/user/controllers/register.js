import UserService from "../services/index.js";

const register = async (req, res, next) => {
    try {
        const { 
            email,
            password,
            role,
            firstName,
            lastName,
            phoneNumber
        } = req.body

        const data = await new UserService().register({
            email,
            password,
            role,
            firstName,
            lastName,
            phoneNumber
        })

        res.status(200).json({data})

    } catch (err) {
        next(err)
    }
}

export default register