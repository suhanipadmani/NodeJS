import express from "express";
const app = express();
const PORT = 3000

app.use(express.json());

let users = [
    {id: 1, name: "abc", email: "abc1@example.com"},
    {id: 2, name: "def", email: "def2@example.com"},
    {id: 3, name: "ghi", email: "ghi3@example.com"}
]

app.get("/", (req, res) => {
    res.json(users);
});

app.get("/api/users/:id", (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if(!user) return res.status(404).json({message: "User not found" });
    res.json(user);
});

app.post("/api/users", (req, res) => {
    const newUser = {
        id: users.length + 1,
        name: req.body.name,
        email: req.body.email
    }
    users.push(newUser);
    res.status(201).json(newUser)
});

app.put("/api/users/:id", (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if(!user) return res.status(404).json({message: "User not found"});

    user.name = req.body.name;
    user.email = req.body.email
});

app.delete("/api/users/:id", (req, res) => {
    const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));   
    if (userIndex === -1) return res.status(404).json({message: "User not found"})

        const deletedUser = users.splice(userIndex, 1)
        res.json(deletedUser[0])

});

app.listen(PORT, () => {
    console.log(`Server is running on https://localhost:${PORT}`);
});