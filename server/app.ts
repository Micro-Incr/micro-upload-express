import 'dotenv/config';
import express, {Application} from 'express';
import cors from 'cors';

// routes
import NotesRoute from './routes/Note.route';

const app: Application = express();

// middlewares
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: false}));

// route middleware
app.use('/api/v1/notes', NotesRoute);

app.use('*', (req, res) => {
    return res.status(404).json({error: 'Nothing here'});
});

export default app;
