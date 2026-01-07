// Handle different Http methods in Node.js Server

import http from 'http';
import { URL } from 'url';
const PORT = 3000;

let todos = [
    {id: 1, task: "Learn Node.js"},
    {id: 2, task: "Build a REST API"},
    {id: 3, task: "Write Unit Tests"}
]

const server = http.createServer((req, res) => {
    const {method, url} = req;
    const parsedUrl = new URL(url, `http://${req.headers.host}`);
    const pathname = parsedUrl.pathname;

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (method === "OPTIONS") {
        res.writeHead(204);
        return res.end();   
    }

    if (pathname === '/todos' && method === 'GET') {
        res.setHeader("content-type", "application/json")
        res.end(JSON.stringify(todos))
    }

    else if (pathname === '/todos' && method === 'POST') {
        let body = "";
         req.on ("data", chunk => {
            body += chunk.toString();
         })

         req.on ("end", () => {
            try {
                const newTodo = JSON.parse(body);
                if (!newTodo.id) {
                    const maxId = todos.length > 0 ? Math.max(...todos.map(t => t.id)) : 0;
                    newTodo.id = maxId + 1;
                }
                todos.push(newTodo);
                res.writeHead(201, {"Content-Type": "application/json"});
                res.end (JSON.stringify (newTodo));
                
            } catch (error) {
                res.writeHead(400, {"Content-Type": "application/json"});
                res.end (JSON.stringify( {error: "Invalid JSON"} ));
                return;
            }
         })
    }

    else if (method === "PUT" && pathname.startsWith('/todos/')) {

        const id = parseInt(pathname.split('/')[2]);

        let body = "";
        req.on("data", chunk => {
            body += chunk.toString();
        });
        req.on("end", () => {
            try {
                const updatedTodo = JSON.parse(body);
                let todoIndex = todos.findIndex(t => t.id === id);  

                if (todoIndex !== -1) {
                    todos[todoIndex] = {...todos[todoIndex], ...updatedTodo};
                    res.writeHead(200, {"Content-Type": "application/json"});
                    res.end(JSON.stringify(todos[todoIndex]));
                } else {
                    res.writeHead(404, {"Content-Type": "application/json"});
                    res.end(JSON.stringify({error: "Todo not found"}));
                }
            } catch (error) {
                res.writeHead(400, {"Content-Type": "application/json"});
                res.end(JSON.stringify({error: "Invalid JSON"}));
                return;
            }   
        });

    }

    else if (method === "DELETE" && pathname.startsWith('/todos/')) {

        const id = parseInt(pathname.split('/')[2]);
        let todoIndex = todos.findIndex(t => t.id === id);

        if (todoIndex !== -1) {
            const deletedTodo = todos.splice(todoIndex, 1);
            res.writeHead(200, {"Content-Type": "application/json"});
            res.end(JSON.stringify(deletedTodo[0]));
        } else {
            res.writeHead(404, {"Content-Type": "application/json"});
            res.end(JSON.stringify({error: "Todo not found"}));
        }

    } else {
        res.writeHead(404, {"Content-Type": "application/json"});
        res.end(JSON.stringify({error: "Route not found"}));
    }
});          

server.listen(PORT, () => {
    console.log("Server is listening on http://localhost:" + PORT);
});