import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const userSchema = new Schema({
    studentID: {
        type: String,
        required: true,   
        unique: true     
    },
     profilePicture: {
        type: Object       
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
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
     gender: {
        type: String,
        required: true,
        enum: ["Male", "Female"]
    },
    role: {
        type: String,
        enum: ['user','admin'],
        default: 'user'
    }   
},{ timestamps: true });


const userModel = model('User', userSchema);

export default userModel;
