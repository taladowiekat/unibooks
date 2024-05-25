import postModel from '../../../db/models/post.model.js';
import cloudinary from '../../utils/cloudinary.js';
import slugify from 'slugify';
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

//delete post for user *_*
export const deletePost = async (req, res) => {
    const { id: postID } = req.params;
  
        const post = await postModel.findById(postID);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
    
        const userId = req.user._id;
        if (post.studentID.toString() !== userId.toString()) {
            return res.status(401).json({ message: 'User not authorized to delete this post' });
        }

        await postModel.findByIdAndDelete(postID);
        res.status(200).send({ message: `Post with Id:${postID} has been deleted by student which  have id:${userId}` });
    
};
//Delete Post For Admin *_*
export const AdminDeletePost = async (req, res) => {
    const { id: postID } = req.params;
    const userId = req.user._id;
    const post = await postModel.findById(postID);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        
        await postModel.findByIdAndDelete(postID);
        res.status(200).send({ message: `Hello Admin, the post with ID ${postID} belonging to user with ID ${userId} has been successfully deleted.  ` });

};
