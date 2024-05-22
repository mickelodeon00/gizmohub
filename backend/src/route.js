import express from 'express';
import seedRouter from './routes/seedRoutes.js';
import userRouter from './routes/userRoutes.js';
import adminRouter from './routes/adminRoutes.js';

const app = express();

app.use('/api/seed', seedRouter);
app.use('/api/user', userRouter);
app.use('/api/admin', adminRouter);

export default app;
