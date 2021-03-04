import 'dotenv/config';
import mongoose from 'mongoose';
import {DATABASE_URI_TEST} from '../config/testConfig';

export const connectToDatabase = (done: () => void): void => {
    mongoose.connect(DATABASE_URI_TEST!, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    }).then(() => {
        console.log('Connected to the database');
        done();
    });
};
