import Note from './../models/Note';
import {Request, Response} from 'express';

// get notes
export const getNotes = async (req: Request, res: Response): Promise<Response> => {
    try {
        const notes = await Note.find();
        return res.status(200).json({data: notes});
    } catch (err) {
        // console.log(err)
        return res.status(500).send({err});
    }
};

// get note by id
export const getNoteById = async (req: Request, res: Response): Promise<Response> => {
    const id = req.params.id;
    try {
        const notes = await Note.findById({_id: id});
        return res.status(200).json({data: notes});
    } catch (err) {
        // console.log(err)
        return res.status(404).send({msg: 'Note not found'});
    }
};

// post a note
export const postNote = async (req: Request, res: Response): Promise<Response> => {
    const {title, content} = req.body;
    const note = new Note({title, content});
    try {
        await note.save();
        return res.status(201).json({data: note._id});
    } catch (err) {
        // console.log(err)
        return res.status(500).send({err});
    }
};

// update a note by id
export const updateNote = async (req: Request, res: Response): Promise<Response> => {
    const id = req.params.id;
    try {
        const noteUpdated = await Note.findByIdAndUpdate({_id: id});
        if (!noteUpdated) {
            return res.status(404).send({msg: 'Note not found'});
        } else {
            return res.status(200).send({data: noteUpdated});
        }
    } catch (err) {
        // console.log(err)
        return res.status(500).send({err});
    }
};

// delete a note by id
export const deleteNote = async (req: Request, res: Response): Promise<Response> => {
    const id = req.params.id;
    try {
        const isDeleted = await Note.findByIdAndDelete({_id: id});
        if (!isDeleted) {
            return res.status(404).send({msg: 'Note not found'});
        } else {
            return res.status(204).send({msg: 'Note deleted'});
        }
    } catch (err) {
        // console.log(err)
        return res.status(500).send({err});
    }
};
