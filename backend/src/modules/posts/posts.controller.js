import postModel from '../../../db/models/post.model.js';
import cloudinary from '../../utils/cloudinary.js';
import slugify from 'slugify';
//create a new post

export const create = async (req, res) => {
        req.body.bookName = req.body.bookName.toLowerCase();
        req.body.slug = slugify(req.body.bookName);

        const bookImages = [];
        for (const file of req.files) {
            const { secure_url, public_id } = await cloudinary.uploader.upload(file.path, {
                folder: 'uniBook/posts'
            });
            bookImages.push({ secure_url, public_id });
        }

        req.body.bookImages = bookImages;
        req.body.studentID = req.user._id;

        if (req.body.postType === 'exchange') {
            req.body.exchangeBookName = req.body.exchangeBookName;
        }

        const newPost = await postModel.create(req.body);

        const populatedPost = await postModel.findById(newPost._id).populate('studentID', 'firstname lastname email');

        return res.status(201).json({ message: 'Post created successfully', post: populatedPost });

};

//delete post
export const deletePost = async (req, res) => {
    const { id: postID } = req.params;
    try {
        const post = await postModel.findById(postID);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const userId = req.user._id;
        if (post.studentID.toString() !== userId.toString()) {
            return res.status(401).json({ message: 'User not authorized to delete this post' });
        }

        await postModel.findByIdAndDelete(postID);
        res.status(200).send({ message: `Post with Id:${postID} has been deleted` });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }

};
