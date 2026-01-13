import mongoose, {Schema} from "mongoose";

mongoose.connect("mongodb://localhost:27017/miniDemo")

const userSchema = new Schema({
    username: String,
    name: String,
    age: Number,
    email: String,
    password: String,
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        }
    ]
});

export const User = mongoose.model("User", userSchema);