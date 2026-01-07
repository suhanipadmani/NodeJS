import {requestHandler} from './handler.js';
import http from 'http';
const PORT = 3000;

http.createServer(requestHandler)
.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
});
