import { string } from 'joi';
import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const userSchema = new Schema({
    studentID: {
        type: String,
        required: true,        
    },
     profilePicture: {
        type: Object       
    },
    firstname: {
        type: String,
        required: true
    },
    lasttname: {
        type: String,
        required: true
    },
    college: {
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

    role: {
        type: string,
        enum: ['user','admin'],
        default: 'user'
    }, gender: {
        type: String,
        enum: ["Male", "Female"],}
        
},{_id:false}, { timestamps: true });


const userModel = model('User', userSchema);

export default userModel;
