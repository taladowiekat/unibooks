import cors from "cors";
import dbconnection from '../../db/connection.js'
import authRouter from './auth/auth.router.js';
import postRouter from './posts/posts.router.js';
import profileRouter from './profile/profile.router.js';
import userRouter from './user/user.router.js';
<<<<<<< HEAD
import userMessage from './message/messageRoutes.js'
=======

>>>>>>> 6ac70ed091608d19efe9d4dbfd485e632dc9d185

const initApp = (app, express) => {

    app.use(cors());

    app.use(express.json());

    dbconnection()

    app.get("/", (req, res) => {
        return res.status(200).json({ message: "Success" });
    });

    //all routers

    app.use('/auth' , authRouter)

    app.use('/post', postRouter)

    app.use('/profile', profileRouter); 

    app.use('/user', userRouter);

<<<<<<< HEAD
    app.use('/message', userMessage);
=======

>>>>>>> 6ac70ed091608d19efe9d4dbfd485e632dc9d185

    
    app.use("*", (req, res) => {
        return res.status(404).json({ message: "page not found" });
    });


};