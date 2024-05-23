import userModel from "../../../db/models/user.model.js";

export const getAllUsers = async(req, res) => {
    try {
        const users = await userModel.find();
        return res.status(200).json(users);
    }
    catch (err) {
        console.log('No data founded');
        return res.status(204);
    }
};

