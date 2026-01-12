import express from 'express';
const app = express();
const router = express.Router();

router.get("/", (req, res) => {
    res.json({message: "All users" });
});

router.post("/", (req, res) => {
    res.json({
        message: "User created",
        data: req.body
     });
});

router.post('/form', (req, res) => {
  res.json(req.body);
});

export default router;