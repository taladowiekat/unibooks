import cors from "cors";
<<<<<<< HEAD:backend/src/modules/app.router.js
import dbconnection from '../../db/connection.js'
import authRouter from "./auth/auth.router.js";


const initApp = (app, express) => {
=======
import dbconnection from '../db/connection.js'

const initApp = (app, express) => {

    dbconnection()
>>>>>>> c615d77aa1527dbbd24a30d2fa546327f5db9920:backend/src/app.router.js

    app.use(cors());

    app.use(express.json());
<<<<<<< HEAD:backend/src/modules/app.router.js

    dbconnection()

=======
    
>>>>>>> c615d77aa1527dbbd24a30d2fa546327f5db9920:backend/src/app.router.js
    app.get("/", (req, res) => {
        return res.status(200).json({ message: "Success" });
    });

    //all routers
<<<<<<< HEAD:backend/src/modules/app.router.js
    app.use('/auth', authRouter)
    
=======




>>>>>>> c615d77aa1527dbbd24a30d2fa546327f5db9920:backend/src/app.router.js
    app.use("*", (req, res) => {
        return res.status(404).json({ message: "page not found" });
    });


};

export default initApp;