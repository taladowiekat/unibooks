
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { customAlphabet } from 'nanoid';
import { sendEmail } from "../../utls/email.js";
import userModel from '../../../db/models/user.model.js';


export const signup = async (req, res) => {
        const {
            firstName,
            lastName, 
            email,
            studentID,
            confirmPassword,
            password,
            college,
            gender,
        } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }

        const existingUser = await userModel.findOne({ studentID });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists with this student id" });
        }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = await userModel.create({
        firstName,
        lastName,
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
        $or: [{ email:identifier }, { studentID: identifier }]
    });

    if (!user) {
        return res.status(404).json({ message: 'User does not exist' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

   const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRE_TIME });      
   delete user.password;

    res.status(200).json({ 
        message: "Success", 
        token,
        user: {
            firstName: user.firstName,
            lastName: user.lastName,
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


export const changePassword = async (req, res) => {
    const { currentPassword, newPassword } = req.body;

    const token = req.headers.authorization.split(' ')[1];

    const decodedToken = jwt.verify(
        token,
        process.env.JWT_SECRET_KEY
    );

    if (!decodedToken)
        return res.status(401).send({ message: "Invalid token" });

    const user = await userModel.findOne({ _id: decodedToken.id });

    if (!user)
        return res.status(404).send({ message: "User Not Found" });

    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch)
        return res.status(400).json({ message: 'Invalid credentials' });
    
    if (currentPassword == newPassword)
        return res.status(401).send({ message: "Current Password and New Password Must Not Be The Same" });


    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();
    return res.status(200).send({ message: "Password Changed Successfully" });
}


export const confirmEmail = async (req, res) => {
    const { token } = req.params;

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        const user = await userModel.findOneAndUpdate(
            { email: decoded.email },
            { confirmEmail: true },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.confirmEmail) {
            return res.json({ message: "Email is confirmed", user });
        } else {
            return res.status(500).json({ message: "Failed to confirm email" });
        }
    } 
