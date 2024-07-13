import express from 'express';
import seedRouter from './routes/seedRoutes.js';
import userRouter from './routes/userRoutes.js';
import adminRouter from './routes/adminRoutes.js';
import productRouter from './routes/productRoutes.js';

const app = express();

app.use('/api/seed', seedRouter);
app.use('/api/user', userRouter);
app.use('/api/admin', adminRouter);
app.use('/api/products', productRouter);

export default app;
