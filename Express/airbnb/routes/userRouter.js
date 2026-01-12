import { rootDir, path } from "../utils/rootPath.js";

import express from "express";
const userRouter = express.Router();

userRouter.get("/", (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'home.html'));
});


export default userRouter;
