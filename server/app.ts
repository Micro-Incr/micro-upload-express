import 'dotenv/config';
import express, {Application} from 'express';
import cors from 'cors';
import './utils/db'
// routes
import ImageRoute from './routes/Image.route';

const app: Application = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

// route middleware
app.use('/api/v1/images', ImageRoute);

app.use('*', (req, res) => {
    return res.status(404).json({error: 'Nothing here'});
});

export default app;
