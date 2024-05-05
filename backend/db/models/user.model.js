import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const userSchema = new Schema({
    profilePicture: {
        type: String,
        default: ''
    },
    name: {
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
        validate: {
            validator: function (v) {
                return /^s\d{8}@stu.najah.edu$/.test(v);
            },
            message: props => `${props.value} is not a valid student email address!`
        }
    },
    universityID: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^\d{8}$/.test(v);
            },
            message: props => `${props.value} is not a valid university ID!`
        }
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 30
    },

    isRegistered: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});


const userModel = model('User', userSchema);

export default userModel;
