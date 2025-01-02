const jwt = require('jsonwebtoken');
require('dotenv').config();

const adminAuth = async (req, res, next) => {
    try {
        // Get the token from the header
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ message: 'Access denied' });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "Adain");

   
            return res.status(200).json({ message: 'Access denied', decoded });
        

    
        next();
    } catch (err) {
        res.status(401).json({ message: 'Invalid token', error: err.message });
    }
};

module.exports = { adminAuth};
