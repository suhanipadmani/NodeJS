import express from 'express';
import dotenv from 'dotenv';
const app = express();
const router = express.Router();
const PORT = process.env.PORT || 8000;
import morgan from 'morgan';
import helmet from 'helmet';

app.use(helmet()); // Using helmet middleware for security
app.use(morgan('dev')); // Using morgan middleware for logging

dotenv.config();


// Application level middleware
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



// Route level middleware
router.use((req, res, next) => {
    console.log("Route level Middleware");
    next();
});

router.get('/user/:id', (req, res) => {
  res.send('User profile');
});     

app.use('/api', router);    // Add the router to the app




// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});


// Built-in middleware 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});