import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema(
    {
        name: {
            type: String, 
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true, 
            unique: true
        },
        password: {
            type: String,
            required: true
        }
    }, 
    { timestamps: true });

// For hash password before save
userSchema.pre("save", async function (next) {
    try {
        if (!this.isModified("password")) return next();

        this.password = await bcrypt.hash(this.password, 10);
        next();
    } catch (error) {
        next(error);
    }
});

userSchema.methods.comparePassword = function(password){
        return bcrypt.compare(password, this.password)
    }

export const User = mongoose.model("User", userSchema);