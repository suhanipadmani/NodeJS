import http from 'http';
import { userRequestHandler } from './user.js';
const server = http.createServer(userRequestHandler);

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running on address http://localhost:${PORT}`);
});