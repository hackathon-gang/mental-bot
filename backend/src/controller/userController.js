import userService from "../services/userServices.js";

const userController = {
    processPostNewUser: async (req, res, next) => {
        try {
            const data = await userService.postNewUser(req.body);
            res.status(200).json({ 
                statusCode: 200,
                ok: true,
                message: 'User created successfully'
            });
        }
        catch (error) {
            console.error('Error in processPostNewUser: ', error);
            return next(error);
            // if (err == "User exists") { res.status(200).json({ message: 'Existing user' }); }
            // else { res.status(500).json({ message: 'An error occurred' }); }
        }
    }
};

export default userController;