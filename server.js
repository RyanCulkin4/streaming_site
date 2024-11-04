import app from './app/api/app.js';
import cron from 'node-cron';
import db from './app/api/db/setup.js';

const port = 3001;

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

/*

Updates All Anime's average rating and total ratings every 10 mins

Probobly a better way to do this but at least this works

*/
async function updateAllAnimeRatings() {
    const updateQuery = `
        WITH rating_stats AS (
            SELECT
                animeid,
                AVG(rating) AS average_rating,
                COUNT(*) AS rating_count
            FROM user_ratings
            GROUP BY animeid
        )
        UPDATE anime
        SET average_rating = COALESCE(rating_stats.average_rating, 0),
            anime_ratings = COALESCE(rating_stats.rating_count, 0)
        FROM rating_stats
        WHERE anime.animeid = rating_stats.animeid;
    `;

    try {
        await db.query(updateQuery);
        console.log('All anime ratings have been updated successfully.');
    } catch (error) {
        console.error('Error updating anime ratings', error);
        throw error;  // Handle the error as needed
    }
}

// Runs code every 1mins
cron.schedule('*/1 * * * *', updateAllAnimeRatings);

/*

* * * * *
- - - - -
| | | | |
| | | | +---- Day of the week (0 - 7) (Sunday is both 0 and 7)
| | | +------ Month (1 - 12)
| | +-------- Day of the month (1 - 31)
| +---------- Hour (0 - 23)
+------------ Minute (0 - 59)

*/