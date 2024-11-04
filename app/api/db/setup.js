import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const db = new pg.Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || '5432', 10), // Ensure port is a number, defaulting to 5432
    idleTimeoutMillis: 10000, // close clients after 10 seconds of inactivity
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false, // SSL for production
});

// Optional: Log connection status
db.on('connect', () => {
    console.log('Database connected successfully');
});

db.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});

export default db;
