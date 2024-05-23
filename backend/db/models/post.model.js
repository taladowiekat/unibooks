import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const postSchema = new Schema({
    studentID: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    bookImage: {
        type: Object,
    },
    bookName: {
        type: String,
        required: true
    },
    notes: {
        type: String,
    },
    postType: {
        type: String,
        enum: ['Sell', 'Donate', 'Exchange']
    },
    exchangeBookName: {
        type: String,
        default: null
    },
    status: {
        type: String,
        enum: ['active', 'inactive']
    },
    slug: {
        type: String,
        required:true
    },

}, { timestamps: true });


const postModel = model('Post', postSchema);

export default postModel;