import jwt from 'jsonwebtoken'

import dotenv from 'dotenv';
dotenv.config();

const jwt_secretKey = process.env.JWT_SECRET_KEY;

export const checkToken = (req, res, next) => {

    // 1. Retrieve the token from headers (you can adjust this as needed)
    const authHeader = req.headers['authorization']; // Use lowercase for 'authorization'

    if (!authHeader) {
        return res.status(401).json({ success: false, message: 'No token provided!' });
    }

    const token = authHeader.split(' ')[1]; // Extract token part after 'Bearer'

    if (!token) {
        //console.log('No token Provided')
        return res.status(401).json({ success: false, message: 'No token provided!' });
    }

    // 2. Verify the token
    jwt.verify(token, jwt_secretKey, (err, decoded) => {
        if (err) {
            //console.log('Invalid or expired token')
            return res.status(401).json({ success: false, message: 'Invalid or expired token!' });
        }

        // 3. Token is valid, attach user info to request
        req.token_userId = decoded.id; // Assuming you stored user ID in the token
        next(); // Call the next middleware or route handler
    });
};