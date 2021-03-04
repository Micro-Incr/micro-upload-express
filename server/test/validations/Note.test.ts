import Note from '../../models/Note';

const mockNote = {
    title: 'Mock string',
    content: 'Mock content'
};

describe('Note model validation test', () => {
    describe('Note model required field validation test', () => {
        it('Note should have title and content', async () => {
            let error = null;

            try {
                const note = new Note(mockNote);
                await note.validate();
            } catch (e) {
                error = e;
            }

            expect(error).toBeNull();
        });

        it('Note should not passed test if title is missing', async () => {
            let error = null;

            const {title} = mockNote;

            try {
                const note = new Note({title});
                await note.validate();
            } catch (e) {
                error = e;
            }

            expect(error).not.toBeNull();
        });

        it('Note should not passed test if content is missing', async () => {
            let error = null;

            const {content} = mockNote;

            try {
                const note = new Note({content});
                await note.validate();
            } catch (e) {
                error = e;
            }

            expect(error).not.toBeNull();
        });
    });
});
