import express, { Request, Response, ErrorRequestHandler } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import 'express-async-errors'; // Must be imported before routes

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(helmet()); // Apply security headers
app.use(cors());
app.use(express.json());

// API routes
import apiRoutes from './api/routes';
import { errorHandler } from './api/middleware/errorHandler';

app.use('/api/v1', apiRoutes);

app.get('/', (_req: Request, res: Response) => {
  res.send('Growth Partners API is running...');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

// Error handling middleware (must be last)
app.use(errorHandler as ErrorRequestHandler);