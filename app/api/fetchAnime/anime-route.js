import db from "../db/setup.js";
import { Router } from "express";
const router = Router()

// Gets ALL Data From ALL Anime
router.get('/stuff/:num', async (req, res) => {
    const returns = req.params.num;

    const query = `
    SELECT * FROM
        anime
    LIMIT $1
    `
    const result = await db.query(query, [returns])

    return res.json(result.rows)
});

router.get('/:animeid', async (req, res) => {
    const animeid = req.params.animeid;

    const query = `
-- CTE to gather general anime information, including the release season based on the anime's release date
WITH anime_info AS (
    SELECT 
        anime.*,                                   -- Select all columns from the anime table
        ARRAY_AGG(users.username) AS author_names, -- Aggregate all author usernames into a single array
        CASE                                       -- Determine the season of release for the anime's main release date
            WHEN EXTRACT(MONTH FROM anime.release_date) IN (3, 4, 5) THEN 'Spring'
            WHEN EXTRACT(MONTH FROM anime.release_date) IN (6, 7, 8) THEN 'Summer'
            WHEN EXTRACT(MONTH FROM anime.release_date) IN (9, 10, 11) THEN 'Fall'
            ELSE 'Winter'                          -- Months 12, 1, 2 fall under Winter
        END AS release_season                -- Alias the result as release_season_anime
    FROM 
        anime
    JOIN 
        anime_authors ON anime.animeid = anime_authors.animeid  -- Join to get authors for the anime
    JOIN 
        users ON anime_authors.authorid = users.userid  -- Join users table to get the author names
    WHERE 
        anime.animeid = $1  -- Filter for a specific anime ID
    GROUP BY 
        anime.animeid  -- Group by animeid to aggregate author usernames
),

-- CTE to gather information about each season of the selected anime
season_info AS (
    SELECT
        anime_season.seasonid,                -- Select season ID
        anime_season.animeid,                 -- Include anime ID for reference
        anime_season.season_number,           -- Select season number
        anime_season.release_date,            -- Select release date of the season
        COUNT(anime_season_episodes.episodeid) FILTER (WHERE anime_season_episodes.visible = true) AS total_episodes_per_season  
                                              -- Count episodes per season where they are visible
    FROM
        anime_season
    LEFT JOIN 
        anime_season_episodes ON anime_season.seasonid = anime_season_episodes.seasonid  -- Left join to get episodes linked to each season
    WHERE 
        anime_season.animeid = $1             -- Filter by the given anime ID
        AND anime_season.visible = true       -- Only include seasons that are visible
    GROUP BY
        anime_season.seasonid, anime_season.animeid  -- Group by season and anime ID for accurate aggregation
),

-- CTE to get information on episodes for each season
season_episode_info AS (
    SELECT
        anime_season_episodes.episodeid,       -- Select episode ID
        anime_season_episodes.seasonid,        -- Select season ID for reference
        anime_season_episodes.episode_number,  -- Episode number within the season
        anime_season_episodes.title,           -- Title of the episode
        anime_season_episodes.visible          -- Visibility status of the episode
    FROM
        anime_season_episodes
    JOIN
        anime_season ON anime_season_episodes.seasonid = anime_season.seasonid  -- Join to ensure episodes belong to selected seasons
    WHERE
        anime_season.animeid = $1              -- Filter by the anime ID
        AND anime_season.visible = true        -- Only include episodes from visible seasons
)

-- Main query to collect all anime, season, and episode information
SELECT 
    anime.*,                                     -- Select all columns from anime_info CTE
    anime.release_season,                  -- Include the calculated release season from anime_info
    EXTRACT(YEAR FROM anime.release_date) AS release_year,  -- Extract the release year from anime's release_date
    COUNT(DISTINCT season_info.seasonid) FILTER (WHERE season_info.total_episodes_per_season > 0) AS total_seasons,  
                                                -- Count distinct seasons with visible episodes
    COALESCE(SUM(season_info.total_episodes_per_season), 0) AS total_episodes,  
                                                -- Sum total episodes across all visible seasons (0 if no episodes)
    JSON_AGG(                                   -- Aggregate season and episode details into a JSON array for easy use in application
        JSON_BUILD_OBJECT(
            'seasonid', season_info.seasonid,           -- Include season ID
            'season_number', season_info.season_number, -- Include season number
            'release_date', season_info.release_date,   -- Include release date of the season
            'episodes', (
                SELECT JSON_AGG(                        -- Nested JSON aggregation for episodes within each season
                    JSON_BUILD_OBJECT(
                        'episodeid', season_episode_info.episodeid,         -- Include episode ID
                        'episode_number', season_episode_info.episode_number, -- Include episode number within the season
                        'title', season_episode_info.title                  -- Include title of the episode
                    )
                )
                FROM season_episode_info
                WHERE season_episode_info.seasonid = season_info.seasonid   -- Only get episodes for the current season
                AND season_episode_info.visible = true                      -- Ensure episodes are visible
            )
        )
    ) AS seasons_with_episodes                  -- Resulting JSON array with all seasons and their episodes
FROM 
    anime_info AS anime                          -- Use anime_info CTE as a base table
LEFT JOIN 
    season_info ON anime.animeid = season_info.animeid  -- Left join season_info to link anime with season data
GROUP BY 
    anime.animeid,                               -- Group by anime ID and other anime fields for aggregation
    anime.romaji_title,
    anime.description,
    anime.trailerid,
    anime.manga_id_reference,
    anime.release_date,
    anime.likes,
    anime.dislikes,
    anime.activity,
    anime.native_title,
    anime.eng_title,
    anime.genre,
    anime.authorid,
    anime.studio,
    anime.type,
    average_rating,
    anime.anime_ratings,
    anime.release_season,                  -- Ensure release_season_anime is included in the group by
    author_names;                                -- Group by author names for consistent aggregation
`;




    try {
        const result = await db.query(query, [animeid]);
        //console.log(result.rows);
        return res.json(result.rows);
    } catch (error) {
        console.error('Database query error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/watch/:animeid/:seasonid/:episodeid', async (req, res) => {

    const { animeid, seasonid, episodeid } = req.params;
    const start_path = 'C:/Users/ryank/Desktop/Nass/Personal_Project/Personal_Project/my-web-app/public/anime/anime_shows'
    const path = start_path + animeid + seasonid + episodeid

    return
});

router.get('/:animeid/episodes', async (req, res) => {
    const animeid = req.params.animeid;

    const query = `
        SELECT 
            anime_season_episodes.*
        FROM 
            anime_season
        JOIN 
            anime_season_episodes ON anime_season.seasonid = anime_season_episodes.seasonid
        WHERE 
            anime_season.animeid = $1      -- Filter for the given anime ID
            AND anime_season.visible = TRUE -- Only include visible seasons
            AND anime_season_episodes.visible = TRUE; -- Only include visible episodes

    `;

    try {
        const result = await db.query(query, [animeid]);
        //console.log(result.rows);
        return res.json(result.rows);
    } catch (error) {
        console.error('Database query error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/:animeid/:episodenumber', async (req, res) => {
    const animeid = req.params.animeid;
    const episodenumber = req.params.episodenumber;

    const query = `
        SELECT 
            anime_season_episodes.*
        FROM 
            anime_season
        JOIN 
            anime_season_episodes ON anime_season.seasonid = anime_season_episodes.seasonid
        WHERE 
            anime_season.animeid = $1      -- Filter for the given anime ID
            AND anime_season_episodes.episodeid = $2
    `;

    try {
        const result = await db.query(query, [animeid, episodenumber]);
        //console.log(result.rows);
        return res.json(result.rows);
    } catch (error) {
        console.error('Database query error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/:animeid/first', async (req, res) => {
    const animeid = req.params.animeid;

    const query = `
        SELECT 
            ase.*
        FROM 
            anime_season_episodes ase
        JOIN 
            anime_season asn ON ase.seasonid = asn.seasonid
        WHERE 
            asn.animeid = $1
            AND asn.season_number = 1
        ORDER BY 
            ase.episode_number ASC
        LIMIT 1;
    `;

    try {
        const result = await db.query(query, [animeid]);
        return res.json(result.rows);
    } catch (error) {
        console.error('Database query error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});




router.get('/:animeid/reviews', async (req, res) => {
    const animeid = req.params.animeid;

    const query = `
        SELECT 
            *
        FROM 
            anime_reviews
        WHERE 
            anime_reviews.animeid = $1
    `;

    try {
        const result = await db.query(query, [animeid]);
        //console.log(result.rows);
        return res.json(result.rows);
    } catch (error) {
        console.error('Database query error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/:animeid/rating', async (req, res) => {
    const { animeid } = req.params;
    const { userid, rating } = req.body;

    const findQuery = `
        SELECT * 
        FROM user_ratings 
        WHERE animeid = $1 AND userid = $2
    `;

    const insertQuery = `
        INSERT INTO user_ratings (userid, animeid, rating) 
        VALUES ($1, $2, $3)
    `;

    const updateQuery = `
        UPDATE user_ratings 
        SET rating = $3 
        WHERE animeid = $1 AND userid = $2
    `;

    try {
        // Check if the user already has a rating for this anime
        const existingRating = await db.query(findQuery, [animeid, userid]);

        if (existingRating.rows.length > 0) {
            // Update the rating if it exists
            await db.query(updateQuery, [animeid, userid, rating]);
            return res.json({ message: 'Rating updated successfully' });
        } else {
            // Insert a new rating if no rating exists
            await db.query(insertQuery, [userid, animeid, rating]);
            return res.json({ message: 'Rating created successfully' });
        }
    } catch (error) {
        console.error('Database query error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/:animeid/rating/:userid', async (req, res) => {
    const animeid = req.params.animeid;
    const userid = req.params.userid;

    const query = `
        SELECT 
            rating
        FROM 
            user_ratings
        WHERE 
            user_ratings.animeid = $1 AND user_ratings.userid = $2
    `;

    try {
        const result = await db.query(query, [animeid, userid]);
        //console.log(result.rows);
        return res.json(result.rows);
    } catch (error) {
        console.error('Database query error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/:animeid/views', async (req, res) => {
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

router.get('/:animeid/likes', async (req, res) => {
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


export default router;