import express from "express";
import userRouter from "./src/routes/user.routes.js";
import taskRouter from "./src/routes/task.routes.js";
import errorMiddleware from "./src/middlewares/error.middleware.js";

const app = express();
let users = [];

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/api/auth", userRouter);
app.use("/api/tasks", taskRouter);

app.use(errorMiddleware);

app.get("/", (req, res) => {
    res.json(users);
});

export default app;

