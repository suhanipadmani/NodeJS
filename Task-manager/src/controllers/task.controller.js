import asyncHandler from "../utils/asyncHandler.js";
import { Task } from "../models/task.model.js";
import ApiError from "../utils/ApiError.js";

export const createTask = asyncHandler (async (req, res, next) => {
    try {
        
        const { title } = req.body;

        if (!title){
            throw new ApiError(400, "Task title is required")
        }
        const task = await Task.create({
            title,
            user: req.user._id
        });
        res.status(201).json({
            success: true,
            task
        });

    } catch (error) {
        next(error);
    }
})

export const getTask = asyncHandler (async (req, res, next) => {
    try {

        const tasks = await Task.find({user: req.user._id})

        res.json({
            success: true,
            tasks
        });
        
    } catch (error) {
        next(error);
    }
})

export const updateTask = asyncHandler (async (req, res, next) => {
    try {

        const task = await Task.findOne({
            _id: req.params.id,
            user: req.user._id
        });

        if (!task){
            throw new ApiError(404, "Task not found");
        }
        
        task.completed = !task.completed;
        await task.save();

        res.json({
            success: true,
            task
        })

    } catch (error) {
        next(error);
    }
})

export const deleteTask = asyncHandler (async (req, res, next) => {
    try {

        const task = await Task.findOneAndDelete({
            _id: req.params.id,
            user: req.user._id
        });

        if (!task){
            throw new ApiError(404, "Task not found");
        }

        res.json({
            success: true,
            message: "Task deleted"
        })

    } catch (error) {
        next(error);
    }
})