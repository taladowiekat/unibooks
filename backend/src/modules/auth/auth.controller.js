import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from '../../db/models/user.model';

const createToken = (payLoad) => {
    return jwt.sign({ id: payLoad }, process.env.JWT_SECRET_KEY, { 
        expiresIn: process.env.JWT_EXPIRE_TIME});
}
export const register = async (req, res) => {
    try {
        const {
            email,
            studentID,
            password,
        } = req.body;

        const existingUser = await userModel.findOne({ studentID: studentID });
        if (!existingUser) {
            return res.status(404).json({ message: "User does not exist" });
        }

        if (!existingUser.isRegistered) {
            return res.status(403).json({ message: "User is not registered" });
        }

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = await userModel.create({
            email,
            studentID,
            password: passwordHash,
            isRegistered: true
        });

        if (!newUser) {
            return res.status(500).json({ message: "Error creating user" });
        }

        const token =  createToken(email)  
        //const refreshToken = await jwt.sign({ email }, process.env.CONFEMAILTOKEN, {expiresIn: 1h})
        sendEmail(email, "Welcome", token);
        return res.status(201).json({ message: "User created successfully", user: newUser });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const login = async (req, res) => {
    try {
        const {
            studentID,
            password
        } = req.body;

        const user = await userModel.findOne({ studentID: studentID });
        if (!user) {
            return res.status(404).json({ message: 'User does not exist' });
        }

        if (!user.isRegistered) {
            return res.status(403).json({ message: 'User is not registered' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = createToken(studentID);
        
        delete user.password;
        res.status(200).json({ message: "Success", token });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
