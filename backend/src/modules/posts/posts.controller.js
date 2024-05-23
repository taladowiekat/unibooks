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

///////////////////////////////////////////////

export const getAllPosts =async(req,res)=> {
try{
    const posts =await postModel.find();
    return res.status(200).json(posts);
}
catch(err){
    console.log('No data founded');
    return res.status(204);
}
};

