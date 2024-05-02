import express from 'express';
import seedRouter from './routes/seedRoutes.js';
import userRouter from './routes/userRoutes.js';

const app = express();

app.use('/api/seed', seedRouter);
app.use('/api/user', userRouter);

export default app;
