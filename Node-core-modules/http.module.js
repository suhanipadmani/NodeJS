import http from 'http';
const PORT = 3000;

const server = http.createServer((req, res) => {
    // res.writeHead(200, {'Content-Type': 'text/plain'});
    // res.end("Hello from Node.js server");  
    
    console.log('Request Headers:', req.headers);

    const userAgent = req.headers['user-agent'];
    const acceptLanguage = req.headers['accept-language'];

    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(`User-Agent: ${userAgent}\nAccept-Language: ${acceptLanguage}`);
});
server.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
});