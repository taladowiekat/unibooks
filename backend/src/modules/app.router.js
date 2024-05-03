import cors from "cors";

const initApp = (app, express) => {

    

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
