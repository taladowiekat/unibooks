import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    senderName: { 
        type: String, 
        required: true 
    },
    message: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
    },
    recevieEmail: {
        type: String,
        required: true
    },
    studentID: { 
        type: String, 
    }
});

const Message = mongoose.model('Message', messageSchema);
export default Message;