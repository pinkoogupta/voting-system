import jwt from 'jsonwebtoken';
import { User } from './../models/user.model.js';

// Middleware for JWT authentication
export const jwtAuthMiddleware = async (req, res, next) => {
    try {
        // Access token from cookies or Authorization header
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            return res.status(401).json({ error: "Unauthorized request" });
        }

        // Verify the token
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        // Fetch user details based on token
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken");

        if (!user) {
            return res.status(401).json({ error: "Invalid access token" });
        }

        // Attach user to request object
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ error: error?.message || "Invalid access token" });
    }
};
