import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";

const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if(!token){
        return next(new ApiError(401, "Token missing"));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id).select("-password")
        if(!user){
            return next(new ApiError(401, "User not found"))
        }

        req.user = user;
        next(); 

    } catch (error) {
        next(new ApiError(401, "Invalid token"));
    }
}

export default authMiddleware; 
