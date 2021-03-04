import * as express from 'express';
import {getNotes, getNoteById, postNote, updateNote, deleteNote} from '../controllers/Note.controller';

const router = express.Router();

router.get('/', getNotes);

router.get('/:id', getNoteById);

router.post('/', postNote);

router.patch('/:id', updateNote);

router.delete('/:id', deleteNote);

export default router;


