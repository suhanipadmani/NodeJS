import express from 'express';
import { logger } from './middlewares/logger.js';
import userRoutes from './routes/userRoutes.js';
import { authorize } from './middlewares/auth.js';
const PORT = 8000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(logger);
app.use('/users', authorize, userRoutes);

app.use((req, res) => {
    res.status(404).json({message: "Route not found" });
});     

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});