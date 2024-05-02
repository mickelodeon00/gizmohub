import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import route from './route.js';

dotenv.config();

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('APP is live...');
});

app.use(route);

const port = 8080 || process.env.PORT;
app.listen(port, () => {
  console.log(`server at http://localhost:${port}`);
});
