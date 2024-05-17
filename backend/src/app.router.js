import cors from "cors";
import dbconnection from '../db/connection.js'
import postsRouter from './modules/post/post.router.js'
import 'dotenv/config';
const initApp = (app, express) => {

    
    app.use(express.json());

    dbconnection()

    app.use(cors());

    app.get("/", (req, res) => {
        return res.status(200).json({ message: "Success" });
    });

    //all routers

    app.use('/posts',postsRouter)


    app.use("*", (req, res) => {
        return res.status(404).json({ message: "page not found" });
    });


};

export default initApp;