import jwt from 'jsonwebtoken';
import userModel from '../../db/models/user.model.js';

export const auth = (accessRole = []) => {
    return async (req, res, next) => {
        const { authorization } = req.headers;
        if (!authorization?.startsWith(process.env.BEARERTOKEN)) {
            return res.status(400).json({ message: "Invalid token" });
        }

        const token = authorization.split(process.env.BEARERTOKEN)[1].trim();
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.LOGINSIG);
        } catch (error) {
            return res.status(400).json({ message: "Invalid token" });
        }

        const user = await userModel.findById(decoded.id).select("studentID firstname lastname role email");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (!accessRole.includes(user.role)) {
            return res.status(403).json({ message: "Not authorized user" });
        }

        req.user = user;
        next();
    };
}
