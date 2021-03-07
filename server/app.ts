import express, { Application } from 'express';
import cors from 'cors';
// routes
import ImageRoute from './routes/Image.route';
import path from 'path';

const app: Application = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static(path.join(__dirname, 'images')));


// route middleware
app.use('/api/v1/images', ImageRoute);

app.use('*', (req, res) => {
  return res.status(404).json({ error: 'Nothing here' });
});

export default app;
