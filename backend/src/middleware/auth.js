import jwt from 'jsonwebtoken';
import userModel from '../../db/models/user.model'

 const verifyToken = async ( req, res, next ) => {
    try {
        const token = req.header('Authorization');

        if(!token){
            return res.status(403).send('Access Denied');
        }

        if (token.startsWith('Bearer ')){
            token = token.slice(7 , token.length).trimLeft();
        }

        const verified = jwt.verify( token, process.env.JWT_SECRET_KEY);
        req.user = verified;
        next();

    } catch (err) {
        res.status(500).json({ errror: err.message})

    }
}
export default verifyToken;