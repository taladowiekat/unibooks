import cors from "cors";
import dbconnection from '../../db/connection.js'
import authRouter from "./auth/auth.router.js";


const initApp = (app, express) => {

    app.use(cors());

    app.use(express.json());

    dbconnection()

    app.get("/", (req, res) => {
        return res.status(200).json({ message: "Success" });
    });

    //all routers
    app.use('/auth', authRouter)
    
    app.use("*", (req, res) => {
        return res.status(404).json({ message: "page not found" });
    });


};

export default initApp;
