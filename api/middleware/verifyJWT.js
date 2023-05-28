import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

function verifyJWT(req, res, next) {
    const secret = process.env.ACCESS_TOKEN_SECRET; // Your JWT secret key
    // Get the token from the request cookies
    const token = req.cookies.access_token;

    if (!token) {
        return res.status(401).json({ message: "Missing token" });
    }

    try {
        // Verify the token and attach the decoded payload to the request object
        const decoded = jwt.verify(token, secret);

        // Check if the requested resource belongs to the authenticated user
        if (req.params.userId && req.params.userId != decoded.id) {
            return res.status(403).json({ error: "Unauthorized access" });
        }

        next();
    } catch (error) {
        // Return an error if the token is invalid
        return res.status(401).json({ message: "Invalid token" });
    }
}

export default verifyJWT;
