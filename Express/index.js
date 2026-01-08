import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;
    
app.get("/", (req, res) => {
    res.send("<h1>Hello from Express</h1>");
})

app.post("/", (req, res) => {
  res.send('POST request to the homepage');
})

app.get("/about", (req, res) => {
    res.send("<h2>This is the about page of Express server</h2>");
})

app.use((req, res) => {
  res.status(404).send('Route not found');
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})