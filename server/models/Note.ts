import {Schema, model, Model, Document} from 'mongoose';


export interface INote extends Document {
    title: string
    content: string
}

const NoteSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true,
        trim: true
    },
});

const NoteModel: Model<INote> = model('Note', NoteSchema);

export default NoteModel;
