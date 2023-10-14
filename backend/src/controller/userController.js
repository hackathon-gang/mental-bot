import userService from "../services/userServices.js";
import config from "../config/config.js";
import jwt from 'jsonwebtoken';

const userController = {
    processPostNewUser: async (req, res, next) => {
        try {
            const userid = await userService.postNewUser(req.body);
            console.log("user id: ", userid);
            res.status(200).json({
                statusCode: 200,
                ok: true,
                message: 'success',
                token: jwt.sign({ id: userid }, config.JWTkey, {
                    expiresIn: 86400    // Expires in 24 hr
                })
            });
        }
        catch (error) {
            console.error('Error in processPostNewUser: ', error);
            return next(error);
        }
    },
    getUserData: async (req, res, next) => {
        
        let uid = req.body.userId;
        try {
            const data = await userService.getUserById(uid);
            res.status(200).json({
                statusCode: 200,
                ok: true,
                data: data
            })
        }
        catch (error) {
            console.error('Error in getUserData: ', error);
            return next(error);
        }
    }
};

export default userController;