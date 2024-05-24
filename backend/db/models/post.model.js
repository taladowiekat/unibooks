import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const postSchema = new Schema({
    studentID: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    bookName: {
        type: String,
        required: true
    },
    notes: {
        type:String,
        required: true
    },
    mainImage: {
        type:Object,
        required: true
    },
    subImages: [{
        type:Object,
        required: true
    }],
    postType: {
        type: String,
        enum: ['Sell', 'Donate', 'Exchange'],
        required: true
    },
    exchangeBookName: {
        type: String,
        default: null
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    },
    slug: {
        type: String,
        required: true
    },
}, { timestamps: true });

const postModel = model('Post', postSchema);

export default postModel;
