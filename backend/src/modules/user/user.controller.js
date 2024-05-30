import userModel from "../../../db/models/user.model.js";
import postModel from "../../../db/models/post.model.js";
import jwt from "jsonwebtoken";
import cloudinary from "../../utils/cloudinary.js";
//Delete Users And Their Posts For Admin *_*
export const deleteUserWithPosts = async (req, res) => {
    const userId = req.params.id;
    const user = await userModel.findById(userId);
    if (!user) {
        return res.status(404).json({ message: 'User  Not Found' });
    }
    const userPosts = await postModel.find({ studentID: userId });//its return array of obj
    userPostsCount=userPosts.length ;
    if (userPosts.length > 0) {
        // Delete  main images associated with each post
        for (let  post of userPosts) {
            // Delete main image
            await cloudinary.uploader.destroy(post.mainImage.public_id);

            // Delete sub-images 
            for (let  subImage of post.subImages) {
                await cloudinary.uploader.destroy(subImage.public_id);
            }
        }
         await postModel.deleteMany({ studentID: userId });
         await userModel.findByIdAndDelete(userId);

         res.status(200).send({ message: `Hello Admin, the user with ID  and ${userPostsCount}  posts have been successfully deleted.` });
    }
    else {
        await userModel.findByIdAndDelete(userId);
        res.status(200).send({ message: `Hello Admin, the user with ID  has been successfully deleted. No posts were associated with this user.` });
    }
};



export const getUserProfile = async (req, res) => {
  const token = req.headers.authorization.split("Token__")[1];
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
    profilePicture: user.profilePicture,
  };

  return res.status(200).json(userData);
};

// code is not complete and didnt connected with frontend 

export const getUserPosts = async (req, res) => {

    const token = req.headers.authorization.split('Token__')[1];
    if (!token) {
        return res.status(401).send({ message: "Access token is missing" });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decodedToken) {
        return res.status(401).send({ message: "Invalid token" });
    }

    const user = await userModel.findById(decodedToken.id);
    if (!user) {
        return res.status(404).send({ message: "Posts not found" });
    }

    try {
        const studentId = req.params.userId;
        const posts = await postModel.find({ studentID: studentId });
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


export const getAllUsers =async(req,res)=> {
    try{
        const users =await userModel.find().populate('studentID', 'firstName lastName email'); 

        ;
        return res.status(200).json(users);
    }
    catch(err){
        console.log('No data founded');
        return res.status(204);
    }
    };