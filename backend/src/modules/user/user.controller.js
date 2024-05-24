import userModel from '../../../db/models/user.model.js';
import jwt from 'jsonwebtoken';

export const getUserProfile = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(401).send({ message: "Access token is missing" });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (!decodedToken) {
            return res.status(401).send({ message: "Invalid token" });
        }

        const user = await userModel.findById(decodedToken.id);
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        const userData = {
            firstName: user.firstName,
            lastName: user.lastName,
            college: user.college,
            email: user.email,
            studentID: user.studentID,
            profilePicture: user.profilePicture

        };

        return res.status(200).json(userData);
    } catch (error) {
        return res.status(500).send({ message: "Server error", error: error.message });
    }
};
