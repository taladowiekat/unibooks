import userModel from '../../../db/models/user.model.js'
import postModel from '../../../db/models/post.model.js';
import jwt from 'jsonwebtoken';
//Delete Users And Their Posts For Admin *_*

export const deleteUserWithPosts = async (req, res) => {
    const userId = req.user._id;
    const user = await userModel.findById(userId);
    if (!user) {
        return res.status(404).json({ message: 'User  Not Found' });
    }

    const userPostsCount = await postModel.countDocuments({ studentID: userId });
    let numPostsDeleted = 0;

    if (userPostsCount > 0) {
        const deletedPosts = await postModel.deleteMany({ studentID: userId });
        numPostsDeleted = deletedPosts.deletedCount;
    }
    if (userPostsCount > 0) {
        const deletedPosts = await postModel.deleteMany({ studentID: userId });
        const numPostsDeleted = deletedPosts.deletedCount;
        await userModel.findByIdAndDelete(userId);

        res.status(200).send({ message: `Hello Admin, the user with ID ${userId} and ${numPostsDeleted} posts have been successfully deleted.` });
    } else {
        await userModel.findByIdAndDelete(userId);
        res.status(200).send({ message: `Hello Admin, the user with ID ${userId} has been successfully deleted. No posts were associated with this user.` });
    }
};


/*
mongosse query used :
(findById):
    Finds a single document by its _id field.
    findById(id) is almost* equivalent to findOne({ _id: id }).
    If you want to query by a document's _id, use findById() instead of findOne()
(deleteMany):
    Deletes all of the documents that match conditions from the collection.
    It returns an object with the property deletedCount containing the number of documents deleted. 
    Behaves like remove(), but deletes all documents that match conditions regardless of the single option.
(findByIdAndDelete):
    Finds a matching document, removes it, and returns the found document (if any).
(countDocuments)    
    The countDocuments() function is used to count the number of documents that match the filter in a database collection.
 */

//what i have done :
/*
-  Checks if the user exists.
- If the user does not exist, it returns a 404 response.
-  Counts the number of posts associated with the user using countDocuments.
-  If there are posts, it deletes them using deleteMany and gets the count of deleted posts.
-  Deletes the user using findByIdAndDelete.
-  Sends a response with details about the number of posts the user had and how many were deleted,
or confirms that no posts were associated if there were none.

*/


export const getUserProfile = async (req, res) => {

    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
        return res.status(401).send({ message: "Access token is missing" });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decodedToken) {
        return res.status(401).send({ message: "Invalid token" });
    }

    const user = await userModel.findById(decodedToken.id);
    if (!user) {
        return res.status(404).send({ message: "User not found" });
    }

    const userData = {
        firstName: user.firstName,
        lastName: user.lastName,
        college: user.college,
        email: user.email,
        studentID: user.studentID,
        profilePicture: user.profilePicture

    };

    return res.status(200).json(userData);

};
