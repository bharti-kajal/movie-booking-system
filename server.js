import express from 'express';
import fs from 'fs';
import router from './src/routes/index.js';
import { connectUsingMongoose } from './src/config/dbConfig.js';

const server = express();
const port = 3200;

// Middlewares
server.use(express.json());

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
});
