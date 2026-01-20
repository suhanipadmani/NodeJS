import express from "express";
import { 
    createTask,
    getTask,
    updateTask,
    deleteTask
 } from "../controllers/task.controller.js";
 import authMiddleware from "../middlewares/auth.middleware.js";

 const taskRouter = express.Router();

 taskRouter.use(authMiddleware);

 taskRouter.post("/", createTask);
 taskRouter.get("/", getTask);
 taskRouter.put("/:id", updateTask);
 taskRouter.delete("/:id", deleteTask);

 export default taskRouter;
