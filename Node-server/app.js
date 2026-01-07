import http from 'http';
const PORT = 3000;

http.createServer((req, res) => {
    console.log(req.url, req.method, req.headers);

    if (req.url === "/"){
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>Example</title></head>');
        res.write('<body><h1>Welcome to Home</h1></body>');
        res.write('</html>');
        return res.end();
    } 
    else if (req.url === '/products') {
            res.setHeader('Content-Type', 'text/html');
            res.write('<html>');
            res.write('<head><title>Example</title></head>');
            res.write('<body><h1>Checkout our products</h1></body>');
            res.write('</html>');
            return res.end();
    }
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Example</title></head>');
    res.write('<body><h1>NodeJS Server</h1></body>');
    res.write('</html>');
    res.end();

    //res.end("Hello from Node.js server"); 
    //process.exit();      
})
.listen(PORT, () => {
    console.log("Server is listening on http://localhost:" + PORT);
});
// function requestHandler(req, res) {
//     console.log(req);
// }

// const server = http.createServer(requestHandler);
// server.listen(3000, () => {
//     console.log("Server is listening on port 3000");
// });
