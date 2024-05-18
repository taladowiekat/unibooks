import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from '../../db/models/user.model';

export const signup = async (req, res) => {
        const {
            firstname,
            lastname, 
            email,
            studentID,
            password,
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
