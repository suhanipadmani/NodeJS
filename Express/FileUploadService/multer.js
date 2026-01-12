import express, { urlencoded } from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = 3000;

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        return cb(null, './uploads')
    },
    filename: function (req, file, cb){
        return cb(null, `${Date.now()}-${file.originalname}`)
    }
});
const upload = multer({storage : storage}) 


app.use(express.json());
app.use(urlencoded());

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "homePage.html"));
});

app.post("/upload",upload.array('profileImage', 5), (req, res) => {
    console.log(req.body)
    console.log(req.files)
     res.send("Multiple files uploaded successfully");
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
});