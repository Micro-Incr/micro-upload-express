import Note, {INote} from '../../models/Note';
import supertest from 'supertest';
import app from '../../app';
import {connectToDatabase} from '../functions/helper';
import mongoose from 'mongoose';

const request = supertest(app);

let note: INote | null;

beforeAll(async (done) => {
    await connectToDatabase(done);
});

const mockNote = {
    title: 'Test Title',
    content: 'Mock description'
};

describe('Test notes route', () => {

    beforeEach(async (done) => {
        try {
            await (new Note(mockNote)).save();
            note = await Note.findOne({title: mockNote.title});
            done();
        } catch (e) {
            console.log(e);
        }
    });

    afterEach(async () => {
        await Note.deleteMany().exec();
    });

    describe('Test create note routes', () => {
        it('Should create a note', async (done) => {
            const res = await request.post('/api/v1/notes').send(mockNote);
            expect(res.status).toBe(201);
            done();
        });

        it('Should not create a note', async (done) => {
            const res = await request.post('/api/v1/notes').send({title: '', content: ''});
            expect(res.status).toBe(500);
            done();
        });
    });

    describe('Test fetch notes route', () => {
        it('Should fetch all the notes from the database', async (done) => {
            const res = await request.get('/api/v1/notes/');
            expect(res.status).toBe(200);
            done();
        });

        it('Should fetch a single note from the database', async (done) => {
            const res = await request.get(`/api/v1/notes/${note!._id}`);
            expect(res.status).toBe(200);
            done();
        });

        it('Should return 404 for an unavailable note', async (done) => {
            const res = await request.get('/api/v1/notes/1');
            expect(res.status).toBe(404);
            done();
        });

    });

    describe('Test update notes route', () => {
        it('Should update a note', async () => {
            const res = await request.patch(`/api/v1/notes/${note!._id}`);
            expect(res.status).toBe(200);
        });

        it('Should respond with 404 response', async () => {
            const res = await request.patch('/api/b1/notes/123456789012');
            expect(res.status).toBe(404);
        });

        it('Should throw 500 server error', async () => {
            const res = await request.patch('/api/v1/notes/1');
            expect(res.status).toBe(500);
        });
    });

    describe('Test delete notes route', () => {
        it('Should respond with 404 response', async () => {
            const res = await request.delete('/api/v1/notes/123456789012');
            expect(res.status).toBe(404);
        });

        it('Should throw 500 server error', async () => {
            const res = await request.delete('/api/v1/notes/1');
            expect(res.status).toBe(500);
        });
        it('Should delete a note', async () => {
            const res = await request.delete(`/api/v1/notes/${note!._id}`);
            expect(res.status).toBe(204);
        });
    });
});

afterAll(async () => {
    await mongoose.disconnect();
});
