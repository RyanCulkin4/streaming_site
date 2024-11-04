import db from "../db/setup.js";

export const auth_specific_user = async (req, res, next) => {

    const userid = req.token_userId
    const token_userId = req.token_userId

    // Check if userid is provided
    if (!userid && token_userId && token_userId == userid) {
        console.log('Valid userid required');
        return res.status(401).json({ message: 'Valid userid required' });
    }
 
    const query = `
    SELECT roles
    FROM users
    WHERE userid = $1
    `;

    try {
        const result = await db.query(query, [userid]);

        if (!result.rows.length) {
            console.log('User not found');
            return res.status(404).json({ message: 'User not found' });
        }

        const roles = result.rows[0].roles;

        // Check if the user is either the specific user or an admin
        if (siteUserId === userid || roles.includes('admin')) {
            next(); // Proceed to the next middleware/route handler
        } else {
            console.log('You do not have permission to view this');
            return res.status(403).json({ message: 'You do not have permission to view this' });
        }

    } catch (error) {
        console.log('Internal server error', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
 