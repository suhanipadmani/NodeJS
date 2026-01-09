import { rootDir, path } from "../utils/rootPath.js";

import express from "express";
const hostRouter = express.Router();

hostRouter.get("/add-home", (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'addHome.html'));
})

hostRouter.post("/add-home", (req, res, next) => {
    console.log(req.body);
    res.sendFile(path.join(rootDir, 'views', 'homeAdded.html'));
})



export default hostRouter;