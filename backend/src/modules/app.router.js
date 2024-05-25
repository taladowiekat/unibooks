import cors from "cors";
import dbconnection from '../../db/connection.js'
import authRouter from './auth/auth.router.js';
import postRouter from './posts/posts.router.js';
import profileRouter from './profile/profile.router.js';
import userRouter from './user/user.router.js';


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



    
    app.use("*", (req, res) => {
        return res.status(404).json({ message: "page not found" });
    });


};

export default initApp;
