import userModel from '../../../db/models/user.model.js';
import jwt from 'jsonwebtoken';
import {v2 as cloudinary} from 'cloudinary';

export const updateProfile = async (req, res) => {
    const { firstName, lastName, college, deleteImage } = req.body;

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
        return res.status(404).send({ message: "User not found or unauthorized" });
    }

    let profilePicture = user.profilePicture;

    if (req.file) {
        try {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'unibooks/user-profiles'
            });
            profilePicture = result.secure_url;
        } catch (error) {
            console.error("Error uploading profile picture to Cloudinary:", error);
            return res.status(500).json({ message: "Failed to upload profile picture" });
        }
    } else if (deleteImage === 'true') {
        profilePicture = null;
    }

    if (
        user.firstName === firstName &&
        user.lastName === lastName &&
        user.college === college &&
        user.profilePicture === profilePicture
    ) {
        return res.status(400).send({ message: "No changes detected" });
    }

    user.firstName = firstName;
    user.lastName = lastName;
    user.college = college;
    user.profilePicture = profilePicture;

    const updatedUser = await user.save();

    if (!updatedUser) {
        return res.status(500).json({ message: "Failed to update user profile" });
    }

    const updatedUserData = {
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        college: updatedUser.college,
        profilePicture: updatedUser.profilePicture
    };

    return res.status(200).json(updatedUserData);
};
