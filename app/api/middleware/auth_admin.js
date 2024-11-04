import db from "../db/setup.js";

export const auth_admin = async (req, res, next) => {
    
    const userid = req.headers.userid;

    // Check if userid is provided
    if (!userid) {
        return res.status(401).json({ message: 'Valid userid required' });
    }

    const query = `
    SELECT roles
    FROM users
    WHERE userid = $1
    `;
    
    try {
        const result = await db.query(query, [userid]);

        console.log(result.rows)

        // Check if the result has any rows
        if (result.rows.length === 0) {
            console.log('User not found');
            return res.status(404).json({ message: 'User not found' });
        }

        // Ensure that roles is defined and check if it includes 'admin'
        const roles = result.rows[0].roles;

        if (!roles || !roles.includes('admin')) {
            return res.status(401).json({ message: 'You dont have the required permission to view this' });
        }

        // Proceed to the next middleware if the user has an admin role
        next();
    } catch (error) {
        console.error('Database query error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
