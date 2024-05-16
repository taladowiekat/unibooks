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
        type: String,
        enum: ['user','admin'],
        default: 'user'
    }, gender: {
        type: String,
        enum: ["Male", "Female"],}
        
},{ timestamps: true });


const userModel = model('User', userSchema);

export default userModel;
