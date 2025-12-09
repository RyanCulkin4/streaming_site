import Fastify from 'fastify';
import { Pool } from 'pg';

const fastify = Fastify();
const PORT = 3104 | 5432;

const pool = new Pool({
  host: 'sql_service',       // or your internal Docker hostname
  port: PORT,
  user: 'postgres',
  password: 'postgres',
  database: 'sql_web_server',
});

fastify.get('/website_vars', async (request, reply) => {
  try {
    const result = await pool.query('SELECT * FROM website_variables');
    return result.rows;
  } catch (err) {
    console.error('SQL Service error:', err);
    reply.status(500).send({ error: 'Database query failed' });
  }
});


fastify.get('/carousel_shows', async (request, reply) => {
  try {
    const result = await pool.query('SELECT * FROM carousel_shows');
    return result.rows;
  } catch (err) {
    console.error('SQL Service error:', err);
    reply.status(500).send({ error: 'Database query failed' });
  }
});


fastify.listen({ port: PORT }, err => {
  if (err) throw err;
  console.log(`SQL Service running on port ${PORT}`);
});
