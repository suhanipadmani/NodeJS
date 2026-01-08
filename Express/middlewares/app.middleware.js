//Application-level Middleware

import express from 'express';
const app = express();
const PORT = process.env.PORT || 8000;

app.use((req, res, next) => {
    console.log("Middleware 1:", new Date().toISOString());
    next();
});

app.use((req, res, next) => {
    console.log("Middleware 2:", new Date().toISOString());
    next();
});

app.get("/", (req, res) => {
    res.send("Hello from Express middleware!");
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});