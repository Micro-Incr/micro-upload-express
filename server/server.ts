import 'dotenv/config';
import app from './app';
import {PORT} from './config/baseConfig';

import connect from './utils/db';

connect.then(() => {
    app.listen(process.env.PORT || PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
