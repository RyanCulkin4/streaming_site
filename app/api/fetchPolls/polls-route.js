import db from "../db/setup.js";
import { Router } from "express";


const router = Router();

// Gets ALL Data From ALL Anime
router.get('/', async (req, res) => {
    const query = 'SELECT * FROM polls';

    try {
        const results = await db.query(query);

        if (results.rows.length === 0) {
            //console.log('No Polls Found!');
            return res.status(404).json({ message: 'No Polls Found!' });
        } else {
            //console.log(results.rows);
            return res.json(results.rows);
        }
    } catch (error) {
        console.error('Database query error:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

export default router;
