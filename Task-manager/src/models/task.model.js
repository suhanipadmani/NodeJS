import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema(
    {
        title: {
            type: String,
            required: String
        },
        completed: {
            type: Boolean,
            default: false
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    }, 
    { timestamps: true });

export const Task = mongoose.model("Task", taskSchema);