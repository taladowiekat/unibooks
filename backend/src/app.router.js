import cors from "cors";
import dbconnection from '../db/connection.js'

const initApp = (app, express) => {

    dbconnection()

    app.use(cors());

    app.use(express.json());
    
    app.get("/", (req, res) => {
        return res.status(200).json({ message: "Success" });
    });

    //all routers




    app.use("*", (req, res) => {
        return res.status(404).json({ message: "page not found" });
    });

};

export default initApp;