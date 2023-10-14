import config from "../config/config.js";
import jwt from 'jsonwebtoken';

const validateUser = {
    validateToken: (req, res, next) => {
        
        if(typeof req.headers.authorization !== "undefined") {
            let token = req.headers.authorization.split(' ')[1];
            jwt.verify(token, config.JWTkey, (err, data) => {
                if(err) {
                    console.log("Error in validateToken: ", err);
                    return res.status(403).json({
                        statusCode: 403,
                        ok: false,
                        message: 'unauthorized access'
                    });
                }
                else {
                    req.body.userId = data.id;
                    next();
                }
            })
        }
        else {
            return res.status(403).json({
                statusCode: 403,
                ok: false,
                message: 'unauthorized access'
            });
        }
    }
};

export default validateUser;