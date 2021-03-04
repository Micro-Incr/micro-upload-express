import app from './app';
import {PORT} from './config/baseConfig';

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
