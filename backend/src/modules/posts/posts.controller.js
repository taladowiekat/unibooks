import postModel from '../../../db/models/post.model.js';
import cloudinary from '../../utils/cloudinary.js';
import slugify from 'slugify';
import jwt from 'jsonwebtoken';
//create a new post
export const createPost = async (req, res) => {
    const { bookName, postType, exchangeBookName } = req.body;

    if (postType === 'Exchange' && !exchangeBookName) {
        return res.status(400).json({ message: 'Exchange book name is required for exchange posts' });
    }

    req.body.slug = slugify(bookName);

    const studentID = req.user._id;

    const folderPath = `unibooks/${studentID}/${slugify(bookName)}`;

    const { secure_url, public_id } = await cloudinary.uploader.upload(req.files.mainImage[0].path,
        { folder: `${folderPath}/main` }
    )

    req.body.mainImage = { secure_url, public_id }

    req.body.subImages = [];

    req.body.studentID = studentID;

    const userName = `${req.user.firstname} ${req.user.lastname}`

    for (const file of req.files.subImages) {
        const { secure_url, public_id } = await cloudinary.uploader.upload(file.path,
            { folder: `${folderPath}/subimages` }
        )
        req.body.subImages.push({ secure_url, public_id })
    }

    req.body.exchangeBookName = postType === 'Exchange' ? exchangeBookName : null;

    const post = await postModel.create(req.body);

    return res.status(200).json({ message: "Success", userName, post })


};

//update post
export const updatePost = async (req, res) => {
    const { id } = req.params;
    const { bookName, postType, notes, exchangeBookName } = req.body;

    if (postType === 'Exchange' && !exchangeBookName) {
        return res.status(400).json({ message: 'Exchange book name is required for exchange posts' });
    }

    const post = await postModel.findById(id);

    if (!post) {
        return res.status(404).json({ message: 'Post not found' });
    }

    //ensure the user is the owner of the post
    if (post.studentID.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'You are not authorized to update this post' });
    }

    const studentID = req.user._id;
    const userName = `${req.user.firstname} ${req.user.lastname}`;
    const folderPath = `unibooks/${studentID}/${slugify(bookName || post.bookName)}`;

    //update the post fields
    if (bookName) {
        post.bookName = bookName;
        post.slug = slugify(bookName);
    }
    post.postType = postType || post.postType;
    post.notes = notes || post.notes;
    post.exchangeBookName = postType === 'Exchange' ? exchangeBookName : post.exchangeBookName;

    //handle main image update if provided
    if (req.files && req.files.mainImage) {
        const { secure_url, public_id } = await cloudinary.uploader.upload(req.files.mainImage[0].path, {
            folder: `${folderPath}/main`
        });
        post.mainImage = { secure_url, public_id };
    }

    //handle sub images update if provided
    if (req.files && req.files.subImages) {
        post.subImages = [];
        for (const file of req.files.subImages) {
            const { secure_url, public_id } = await cloudinary.uploader.upload(file.path, {
                folder: `${folderPath}/subimages`
            });
            post.subImages.push({ secure_url, public_id });
        }
    }

    await post.save();

    return res.status(200).json({ message: "Success", userName, post });
}


// Get all posts
export const getAllPosts = async (req, res) => {
    try {
        const posts = await postModel.find().populate('studentID', 'firstName lastName email');
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching posts', error });
    }
};

// Get post details
export const getPostDetails = async (req, res) => {
    const { id } = req.params;
    const post = await postModel.findById(id).populate('studentID', 'firstName lastName profilePicture');
    if (!post) {
        return res.status(404).json({ message: 'Post not found' });
    }
    return res.status(200).json(post);
};

//delete post for user *_*
export const deletePost = async (req, res) => {
    const { id: postID } = req.params;
        const post = await postModel.findById(postID);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        } 
        const   imageID= await post.mainImage.public_id;
        await cloudinary.uploader.destroy(imageID);

        for (let subImage of post.subImages) {
            await cloudinary.uploader.destroy(subImage.public_id);
        }
        await postModel.findByIdAndDelete(postID);
        res.status(200).send({ message: "Post deleted by its owner"});
};
//Delete Post For Admin *_*
export const AdminDeletePost = async (req, res) => {
    const { id: postID } = req.params;
   
    const post = await postModel.findById(postID);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        const   imgageID= await post.mainImage.public_id;
        await cloudinary.uploader.destroy(imgageID);

        for (let  subImage of post.subImages) {
            await cloudinary.uploader.destroy(subImage.public_id);
        }
        await postModel.findByIdAndDelete(postID);
        res.status(200).send({ message: "post deleted by Admin" });
};

