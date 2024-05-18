import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { customAlphabet } from 'nanoid';
import { sendEmail } from "../../utls/email.js";
import userModel from '../../../db/models/user.model.js';

export const signup = async (req, res) => {
    const {
        firstname,
        lastname,
        email,
        studentID,
        password,
        college,
        gender,
    } = req.body;

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: "User already exists with this email" });
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = await userModel.create({
        firstname,
        lastname,
        email,
        studentID,
        password: passwordHash,
        college,
        gender,
    });

    if (!newUser) {
        return res.status(500).json({ message: "Error creating user" });
    }

    res.status(201).json(newUser);


};


export const signin = async (req, res) => {
    const { identifier, password } = req.body;

    const user = await userModel.findOne({
        $or: [{ email: identifier }, { studentID: identifier }]
    });

    if (!user) {
        return res.status(404).json({ message: 'User does not exist' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRE_TIME });
    delete user.password;

    res.status(200).json({
        message: "Success",
        token,
        user: {
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            studentID: user.studentID
        }
    });
};


export const forgotPassword = async (req, res) => {
    const { email } = req.body;
    
    const generateCode = customAlphabet('123456789abcdef', 4);
    const code = generateCode(); // Generate the code
    
    const user = await userModel.findOneAndUpdate(
        { email },
        { sendCode: code }, // Store the generated code in the user model
        { new: true }
    );

    
    if (!user)
        return res.status(404).json({ message: "user not found" });

    await sendEmail(email, 'Reset Password', `<h2>${code}</h2>`);

    return res.status(200).json({ message: "success", code });
};


export const resetPassword = async (req, res) => {
    const { email, password, code } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
        return res.status(404).json({ message: "email not found" });
    }

    if (user.sendCode != code) {
        return res.status(400).json({ message: "invalid code" });
    }

    const salt = await bcrypt.genSalt()
    user.password = await bcrypt.hash(password, salt);

    user.sendCode = null;

    await user.save();

    res.json({ message: "success" });
};
