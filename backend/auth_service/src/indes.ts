import Fastify from 'fastify';
import fastifyJwt from 'fastify-jwt';

const app = Fastify();

// Secret for JWT
const JWT_SECRET = 'your-secret-key'; 

// Register the JWT plugin
app.register(fastifyJwt, { secret: JWT_SECRET });

// Simple route to create a token (authentication)
app.post('/login', async (request, reply) => {
  const { username, password } = request.body as { username: string; password: string };

  // Here you would typically validate the username/password
  if (username === 'admin' && password === 'password') {
    const token = app.jwt.sign({ username });
    return reply.send({ token });
  } else {
    return reply.status(401).send({ message: 'Invalid credentials' });
  }
});

// Simple route to check if the token is valid
app.get('/profile', async (request, reply) => {
  try {
    await request.jwtVerify();
    return { message: 'Protected route accessed' };
  } catch (err) {
    return reply.status(401).send({ message: 'Unauthorized' });
  }
});

app.listen({ port: 9100, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  console.log(`🚀 Auth Service listening at ${address}`);
});
