import db from "../db/setup.js";
import { Router } from "express";
import { auth_admin } from "../middleware/auth_admin.js";
import { auth_specific_user } from "../middleware/auth_specific_user.js";
import { checkToken } from "../middleware/checkToken.js";
const router = Router()
import bcrypt from 'bcrypt'

// Gets ALL Data From ALL Users
router.get('/', auth_admin, async (req, res) => {
    const query = `
    SELECT * 
    FROM users
    `
    const result = await db.query(query)

    return res.json(result.rows)
});

router.get('/:id', async (req, res) => { //router.get('/:id', auth_specific_user, async (req, res) => {
    const id = req.params.id;

    const query = `
    SELECT
        userid, 
        username, 
        email, 
        date_joined, 
        num_of_friends, 
        num_of_followers, 
        profile_picture, 
        user_bio, 
        two_factor, 
        email_notifications, 
        push_notifications, 
        subscription
    FROM 
        users
    WHERE 
        userid = $1
    `
    const result = await db.query(query, [id])
    console.log(result.rows)
    return res.json(result.rows)
});

router.get('/delete', checkToken, auth_specific_user, async (req, res) => {
    const id = req.params.userid;
    console.log('This somehow worked');
    // Proceed with your delete logic here
    res.status(200).json({ message: `Item with id ${id} will be deleted` });
}); 

router.post('/save', checkToken, async (req, res) => {
    const userId = req.token_userId; // Get userId from the token
    const updatedSettings = req.body.settings; // Get updated settings from the request body

    console.log('This somehow worked');

    // Query to fetch the current password hash
    const pw_query = `
        SELECT password_hash 
        FROM users
        WHERE userid = $1
    `;

    try {
        const result = await db.query(pw_query, [userId]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if password needs to be updated
        let hashedPassword = result.rows[0].password_hash; // Default to current hash
        if (updatedSettings.password_hash) {
            // If a new password is provided, hash it
            hashedPassword = await bcrypt.hash(updatedSettings.password_hash, 12); // Use appropriate salt rounds
        }

        const query = `
            UPDATE users
            SET 
                email = $1,
                subscription = $2,
                email_notifications = $3,
                push_notifications = $4,
                password_hash = $5
            WHERE userid = $6
            RETURNING *;
        `;

        const values = [
            updatedSettings.email,
            updatedSettings.subscription,
            updatedSettings.email_notifications,
            updatedSettings.push_notifications,
            hashedPassword,
            userId,
        ];

        // Execute the update query
        const updateResult = await db.query(query, values);

        if (updateResult.rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'Settings updated successfully', updatedUser: updateResult.rows[0] });
    } catch (error) {
        console.error('Database error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/activity/:userid/:contentid/:mediatype', async (req, res)=> {
    const userid = parseInt(req.params.userid, 10);
    const contentid = parseInt(req.params.contentid, 10);
    const mediatype = req.params.mediatype

    const user_query = `
        SELECT 
            * 
        FROM 
            user_activity 
        WHERE 
            user_activity.userid = $1
            AND user_activity.parent_content = $2 
            AND user_activity.mediatype = $3
    `;

    try {
        const result = await db.query(user_query, [userid, contentid, mediatype]);

        if (result.rows.length === 0) {
            console.log('No Rows Found')
            return res.json(null);  // Send response as null if no activity found
        } else {
            return res.json(result.rows[0]);   // Send only the latest activity
        }
    } catch (error) {
        console.log('Database query error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});


export default router; 