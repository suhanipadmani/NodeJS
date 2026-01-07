import { URLSearchParams } from "url";

export const sumRequestHandler = (req, res) => {
    console.log("Inside sumRequestHandler", req.method);

        let body = [];

        req.on('data', chunk => {
            body.push(chunk); 
        });

        req.on('end', () => {

            const bodyStr = Buffer.concat(body).toString();
            console.log("Body string:", bodyStr);

            const params = new URLSearchParams(bodyStr);
            const bodyObj = Object.fromEntries(params);
            console.log("Body object:", bodyObj);

            const result = Number(bodyObj.first) + Number(bodyObj.second);
            console.log("Sum result:", result);

            res.setHeader('Content-Type', 'text/html');
            res.write(`
            <html>
                <head><title>Practice Set</title></head>
                <body>
                <h1>Your Sum is ${result}</h1>
                </body>  
            <html>  
            `); 
            return res.end();

        });    
}

