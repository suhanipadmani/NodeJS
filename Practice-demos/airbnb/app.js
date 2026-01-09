import { rootDir, path } from "./utils/rootPath.js";

import express from "express";
import userRouter from "./routes/userRouter.js";
import hostRouter from "./routes/hostRouter.js";

const app = express();
const PORT = 3000;

app.use(express.urlencoded());
app.use(userRouter); 
app.use("/host",hostRouter);

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(rootDir, 'views', '404.html'));
    
});


app.listen(PORT, () => {
    console.log(`Server is running on https://localhost:${PORT}`);
})