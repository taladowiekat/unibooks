import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const messageSchema = new Schema({
    senderName: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

const Message = model('Message', messageSchema);

export default Message;