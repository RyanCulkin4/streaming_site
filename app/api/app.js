import express from 'express';
const app = express();
app.use(express.json());
import cors from 'cors';
app.use(cors());

import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

// ---- Routers Used For Data Recovery ----

import usersRouter from './fetchUser/user-route.js'
import animeRouter from './fetchAnime/anime-route.js'
import db from './db/setup.js';
//import mangaRouter from './fetchManga/manga-route'
//import moviesRouter from './fetchMovies/movies-route'
import pollsRouter from './fetchPolls/polls-route.js'
import { checkToken } from './middleware/checkToken.js';
import { SearchSlashIcon } from 'lucide-react';
//import storeRouter from './fetchStore/store-route'

app.use('/user', usersRouter);
app.use('/anime', animeRouter);
//app.use('/manga', mangaRouter);
//app.use('/movies', moviesRouter);
app.use('/polls', pollsRouter);
//app.use('/store', storeRouter);

// ---- Routers Used For Authentication ----

const jwt_secretKey = process.env.JWT_SECRET_KEY;


app.get('/', (req, res) => {
    res.send('Hello From the Server, How are you today?')
});

// Login Route
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const isEmail = username.includes('@');
        const query = isEmail
            ? 'SELECT * FROM users WHERE email = $1'
            : 'SELECT * FROM users WHERE username = $1';

        const results = await db.query(query, [username]);

        if (results.rows.length === 0) {
            //console.log('User not found!');
            return res.status(404).json({ error: 'User not found' });
        }

        const db_password = results.rows[0].password_hash;

        // Using bcrypt.compare with async/await
        const isMatch = await bcrypt.compare(password, db_password);

        if (isMatch) {
            //console.log('Password is valid!');
            const token = jwt.sign(
                { id: results.rows[0].userid },
                jwt_secretKey,
                { expiresIn: '1D' }
            );
            //console.log(token);
            return res.json({ token });
        } else {
            //console.log('Invalid password!');
            return res.status(401).json({ error: 'Invalid password' });
        }
    } catch (err) {
        console.error('Error during login:', err);
        return res.status(500).json({ error: 'Server error' });
    }
});

app.post('/signup', async (req, res) => {
    const { username, password, email, selectedTier } = req.body;

    //console.log(username, password, email, selectedTier)
    try {
        const usernamedb =
            `
        SELECT 
            * 
        FROM 
            users
        WHERE 
            username = $1
        `
        const emaildb =
            `
        SELECT 
            * 
        FROM 
            users
        WHERE 
            email = $1
        `

        const username_results = await db.query(usernamedb, [username]);
        const email_results = await db.query(emaildb, [email]);

        if (username_results.rows.length === 0 && email_results.rows.length === 0) {
            // Both username and email are available, proceed to insert into the database

            // Hash the password before storing it
            const hashedPassword = await bcrypt.hash(password, 12); // Use appropriate salt rounds

            const insertUserQuery = `
                INSERT INTO users (username, email, password_hash, subscription)
                VALUES ($1, $2, $3, $4) RETURNING userid
            `;

            const insertResult = await db.query(insertUserQuery, [username, email, hashedPassword, selectedTier]);

            const token = jwt.sign(
                { id: insertResult.rows[0].userid },
                jwt_secretKey,
                { expiresIn: '1D' }
            );

            return res.status(201).json({ token });
        }

        if (username_results.rows.length === 0) {
            return res.status(401).json({ error: 'Username already Used' });
        }

        if (email_results.rows.length === 0) {
            return res.status(401).json({ error: 'Email already Used' });
        }

    } catch (err) {
        console.error('Database query error:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.get('/checkToken', checkToken, (req, res) => {
    //console.log({ success: true, message: 'Token is valid!', userId: req.token_userId })
    res.json({ success: true, message: 'Token is valid!', userId: req.token_userId })
});

app.get('/sitedata', async (req, res) => {

    const query = `
        SELECT 
            *
        FROM 
            website_variables
    `;

    try {
        const result = await db.query(query);
        //console.log(result.rows);
        return res.json(result.rows);
    } catch (error) {
        console.error('Database query error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/subscription_tiers', async (req, res) => {

    const query = `
        SELECT 
            *
        FROM 
            subscription_tiers
    `;

    try {
        const result = await db.query(query);
        //console.log(result.rows);
        return res.json(result.rows);
    } catch (error) {
        console.error('Database query error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Exclude In Query
app.get('/query/:toQuery/e/:excludeQuery/:returns', checkToken, async (req, res) => {
    const { toQuery, excludeQuery, returns } = req.params;

    // Convert the excludeQuery back into an array
    const excludes = excludeQuery.split(',').map(item => item.trim());

    // Create a safe list of allowed table names to prevent SQL injection
    const allowedTables = [
        'anime',
        'anime_authors',
        'anime_reviews',
        'anime_season',
        'anime_season_episodes',
        'anime_season_episodes_comments',
        'user_bookmarks',
        'content_watched',
        'disliked_content',
        'liked_content',
        'manga',
        'manga_reviews',
        'manga_volume',
        'manga_volume_chapter_comments',
        'manga_volume_chapters',
        'movie_comments',
        'movie_episodes',
        'movie_seasons',
        'movies',
        'poll_comments',
        'polls',
        'shopping_cart',
        'store',
        'subscription_tiers',
        'users',
        'video_comments',
        'videos',
        'website_variables'
    ];

    if (!allowedTables.includes(toQuery)) {
        return res.status(400).json({ message: 'Invalid query type' });
    }

    try {
        // First, get all columns for the specified table
        const columnsQuery = `SELECT column_name FROM information_schema.columns WHERE table_name = $1`;
        const columnResult = await db.query(columnsQuery, [toQuery]);

        // Get the column names
        const allColumns = columnResult.rows.map(row => row.column_name);

        // Check if 'none' is in the excludes
        if (excludes.includes('none')) {
            // If 'none' is specified, select all columns
            const selectedColumns = allColumns;

            // Construct the SQL query using all selected columns
            const query = `
                SELECT ${selectedColumns.join(', ')} 
                FROM ${toQuery} 
                LIMIT $1
            `;

            // Execute the query with the limit as the only parameter
            const result = await db.query(query, [parseInt(returns, 10)]);

            console.log(result.rows)
            // Return the fetched data
            return res.status(200).json(result.rows);
        } else {
            // Filter out excluded columns
            const selectedColumns = allColumns.filter(column => !excludes.includes(column));

            // If there are no columns left to select, return an error
            if (selectedColumns.length === 0) {
                return res.status(400).json({ message: 'No columns left to select after exclusions' });
            }

            // Construct the SQL query using the selected columns
            const query = `
                SELECT ${selectedColumns.join(', ')} 
                FROM ${toQuery} 
                LIMIT $1
            `;

            // Execute the query with the limit as the only parameter
            const result = await db.query(query, [parseInt(returns, 10)]);

            // Return the fetched data
            console.log(result.rows)
            return res.status(200).json(result.rows);
        }
    } catch (error) {
        console.error('Database query error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Include In Query
app.get('/query/:toQuery/i/:includeQuery/:returns', checkToken, async (req, res) => {
    const { toQuery, includeQuery, returns, token_status } = req.params;

    // Convert the includeQuery back into an array
    const includes = includeQuery.split(',').map(item => item.trim());

    // Create a safe list of allowed table names to prevent SQL injection
    const allowedTables = [
        'anime',
        'anime_authors',
        'anime_reviews',
        'anime_season',
        'anime_season_episodes',
        'anime_season_episodes_comments',
        'user_bookmarks',
        'content_watched',
        'disliked_content',
        'liked_content',
        'manga',
        'manga_reviews',
        'manga_volume',
        'manga_volume_chapter_comments',
        'manga_volume_chapters',
        'movie_comments',
        'movie_episodes',
        'movie_seasons',
        'movies',
        'poll_comments',
        'polls',
        'shopping_cart',
        'store',
        'subscription_tiers',
        'users',
        'video_comments',
        'videos',
        'website_variables'
    ];

    if (!allowedTables.includes(toQuery)) {
        return res.status(400).json({ message: 'Invalid query type' });
    }

    try {
        // First, get all columns for the specified table
        const columnsQuery = `SELECT column_name FROM information_schema.columns WHERE table_name = $1`;
        const columnResult = await db.query(columnsQuery, [toQuery]);

        // Get the column names
        const allColumns = columnResult.rows.map(row => row.column_name);

        // Check if 'none' is in the includes
        if (includes.includes('all')) {
            // If 'none' is specified, select all columns
            const selectedColumns = allColumns;

            // Construct the SQL query using all selected columns
            const query = `
                SELECT ${selectedColumns.join(', ')} 
                FROM ${toQuery} 
                LIMIT $1
            `;

            // Execute the query with the limit as the only parameter
            const result = await db.query(query, [parseInt(returns, 10)]);

            // Return the fetched data
            return res.status(200).json(result.rows);
        } else {
            // Filter to get only the included columns
            const selectedColumns = allColumns.filter(column => includes.includes(column));

            // If there are no columns left to select, return an error
            if (selectedColumns.length === 0) {
                return res.status(400).json({ message: 'No valid columns to select' });
            }

            // Construct the SQL query using the selected columns
            const query = `
                SELECT ${selectedColumns.join(', ')} 
                FROM ${toQuery} 
                LIMIT $1
            `;

            // Execute the query with the limit as the only parameter
            const result = await db.query(query, [parseInt(returns, 10)]);

            // Return the fetched data
            return res.status(200).json(result.rows);
        }
    } catch (error) {
        console.error('Database query error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.get('/bookmarks/:userid/:contentid/:mediatype', async (req, res) => {
    const { userid, contentid, mediatype } = req.params;

    const query = `
        SELECT 
            * 
        FROM 
            user_bookmarks 
        WHERE 
            user_bookmarks.userid = $1 AND user_bookmarks.contentid = $2 AND user_bookmarks.mediatype = $3
    `;

    try {
        const result = await db.query(query, [userid, contentid, mediatype]);
        if (result.rows.length === 0) {
            return res.json(false);  // Send response as false if no bookmark found
        } else {
            return res.json(true);   // Send response as true if bookmark exists
        }
    } catch (error) {
        console.error('Database query error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.post('/bookmarks/:userid/:contentid/:mediatype', async (req, res) => {
    const { userid, contentid, mediatype } = req.params;

    const findQuery = `
        SELECT * 
        FROM user_bookmarks 
        WHERE userid = $1 AND contentid = $2 AND mediatype = $3
    `;

    const insertQuery = `
        INSERT INTO user_bookmarks (userid, contentid, mediatype) 
        VALUES ($1, $2, $3)
    `;

    const deleteQuery = `
        DELETE FROM user_bookmarks 
        WHERE userid = $1 AND contentid = $2 AND mediatype = $3
    `;

    try {
        // Check if the bookmark already exists
        const existingBookmark = await db.query(findQuery, [userid, contentid, mediatype]);

        if (existingBookmark.rows.length > 0) {
            // Delete the bookmark if it exists
            await db.query(deleteQuery, [userid, contentid, mediatype]);
            return res.json({ message: 'Bookmark removed successfully' });
        } else {
            // Insert a new bookmark if it doesn't exist
            await db.query(insertQuery, [userid, contentid, mediatype]);
            return res.json({ message: 'Bookmark added successfully' });
        }
    } catch (error) {
        console.error('Database query error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.get('/episodes/:animeid/:seasonid/:episode_number/:next', async (req, res) => {
    const animeid = Number(req.params.animeid);
    const seasonid = Number(req.params.seasonid);
    const episode_number = Number(req.params.episode_number);
    const next = Number(req.params.next);
    const direction = parseInt(next);

    try {
        // Step 1: Find the next or previous episode in the current season
        let query = `
            SELECT * FROM anime_season_episodes 
            WHERE seasonid = $1 
            AND episode_number = $2
        `;


        // Step 2: If there's no episode in the same season, check for adjacent seasons
        const result = await db.query(query, [seasonid, parseInt(episode_number) + direction]);
        const episode = result.rows[0]

        console.log(episode)
        
        if (!episode) {
            const newSeasonNumber = parseInt(seasonid) + (direction > 0 ? 1 : -1);

            // Step 3: Get the first or last episode in the adjacent season
            query = `
                SELECT * FROM anime_season_episodes 
                WHERE seasonid = (SELECT seasonid FROM anime_season WHERE animeid = $1 AND season_number = $2)
                ORDER BY episode_number ${direction > 0 ? 'ASC' : 'DESC'} 
                LIMIT 1
            `;
            values = [animeid, newSeasonNumber];
            const newSeasonResult = await db.query(query, values);
            episode = newSeasonResult.rows[0];
        }

        if (episode) {
            res.json({ episode });
        } else {
            res.status(404).json({ message: 'No more episodes in this direction' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
});


// Handles all requests that dont exsist
app.all('*', (req, res) => {
    return res.status(401).json({ error: 'Invalid Link' });
});
/* 
---- Example Code ----
 
app.get('/api/anime/:id/bookmark/:bmid', async (req, res) => {
    
    const queryStringValues = req.query;
    
    const {id, bmid} = req.params;
    //const id = req.params.id;
});
 
*/
export default app; 