import http from 'http';

const server = http.createServer((req, res) => {

  console.log('Request received:', req.method); 

  if (req.method === 'POST') {

    let body = '';

    req.on('data', chunk => {
      body += chunk;
    });

    req.on('end', () => {
      const parsedData = {};

      body.split('&').forEach(pair => {
        const [key, value] = pair.split('=');
        parsedData[key] = value;
      });

      console.log('Parsed Data:', parsedData); 

      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(parsedData));
    });
  } else {
    res.end('Send POST request');
  }
});

server.listen(3001, () => {
  console.log('Server running on http://localhost:3001'); 
});
