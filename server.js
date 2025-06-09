import express from 'express';
import fs from 'fs';
import swagger from 'swagger-ui-express';
import router from './src/routes/index.js';
import { connectUsingMongoose } from './src/config/dbConfig.js';

const server = express();
const port = 3200;
const apiDocs = JSON.parse(fs.readFileSync('./swagger.json', 'utf-8'));

// Middlewares
server.use(express.json());

// load Swagger UI
server.use('/api-docs', swagger.serve, swagger.setup(apiDocs));

// Routes
server.use('/api', router);

// 404 Error Handler
server.use((req, res, next) => {
  res.status(404).json({
    status: false,
    message: 'The requested endpoint does not exist'
  });
});

server.listen(port, async () => {
  await connectUsingMongoose();
  console.log(`Server running on port ${port}`);
  console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
});
