import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT;
app.use(express.json());

const users = [
    {username: "suhani", 
    password: await bcrypt.hash("djhciuefcjn", 10)}
];

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

app.get("/", (req, res) => {
    res.json(users);
});

// Register a user
app.post("/register", async(req, res) => {
    try {
        const {username, password} = req.body;

        if (users.find(u => u.username === username)) {
            return res.status(400).json({message: "Username already exists"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = {
            id: users.length + 1,
            username,
            password: hashedPassword
        }

        users.push(user);
        res.status(201).json({message: "User registered successfully"});

    } catch (error) {
        res.status(500).json({message: "Registration failed"});
    }
});

// Login user
app.post("/login", async(req, res) => {
    try {
        const { username, password } = req.body;
    
    const user = users.find(u => u.username === username);
    if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid password' });
    }
    
    const token = jwt.sign(
        { userId: user.id, 
            username: user.username },
        JWT_SECRET_KEY,
        { expiresIn: '1h' }
    );
    
    res.json({ token });
    } catch (error) {
    res.status(500).json({ error: 'Authentication failed' });
  }
});

// Verify JWT token 

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if(!token) return res.status(401).json({message: "Authentication required"});

    jwt.verify(token, JWT_SECRET_KEY, (err, user) => {
        if(err) return res.status(403).json({message: "Invalid or expired token"});
        req.user = user;
        next();
    });
}

app.get("/profile", authenticateToken, (req, res) => {
    res.json({user: req.user});
});

app.listen(PORT, () => {
    console.log(`Server i running on http://localhost:${PORT}`);
});
