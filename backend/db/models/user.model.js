import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const userSchema = new Schema({
    studentID: {
        type: String,
        required: true,
        unique: true
    },
    profilePicture: {
        type: Object,
        default: ''
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 30
    },
    college: {
        type: String,
        required: true,
        enum: [
            "Faculty of Agriculture and Veterinary Medicine",
            "Faculty of Business and Communication",
            "Faculty of Engineering and Information",
            "Faculty of Fine Arts",
            "Faculty of Medicine and Health Sciences",
            "Faculty of Law and Political Sciences",
            "Faculty of Humanities and Educational Sciences",
            "Faculty of Science",
            "Faculty of Shari'ah"
        ]
    },
    gender: {
        type: String,
        required: true,
        enum: ["male", "female"]
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    sendCode: {
        type: String
    }

}, { timestamps: true });


const userModel = model('User', userSchema);

export default userModel;
