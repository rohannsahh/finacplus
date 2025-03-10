import User, { IUser } from "../models/UserModel";
import { Request, Response } from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

export const createUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, age, dob, password, gender, about } = req.body;

        if (!name || name.trim() === "") {
            res.status(400).json({ error: "Name cannot be empty" });
            return;
        }
        if (!age || age < 0 || age > 120) {
            res.status(400).json({ error: "Age must be between 0 and 120" });
            return;
        }
        if (!dob || !/^\d{4}-\d{2}-\d{2}$/.test(dob)) {
            res.status(400).json({ error: "DOB must be in YYYY-MM-DD format" });
            return;
        }
        if (!password || password.length < 10) {
            res.status(400).json({ error: "Password should be at least 10 characters long" });
            return;
        }
        if (!gender || !["Male", "Female", "Others"].includes(gender)) {
            res.status(400).json({ error: "Invalid gender" });
            return;
        }
        const existingUser = await User.findOne({ name: name.trim() });
        if (existingUser) {
            res.status(409).json({ error: "User with this name already exists" });
            return;
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser: IUser = new User({ name, age, dob, password: hashedPassword, gender, about });
        await newUser.save();

        res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

export const getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

export const getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            res.status(400).json({ error: "Invalid user ID format" });
            return;
        }

        const user = await User.findById(id);
        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { name, age, dob, password, gender, about } = req.body;

        if (!mongoose.isValidObjectId(id)) {
            res.status(400).json({ error: "Invalid user ID format" });
            return;
        }

        const user = await User.findById(id);
        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }

        if (name) user.name = name;
        if (age) user.age = age;
        if (dob && /^\d{4}-\d{2}-\d{2}$/.test(dob)) user.dob = dob;
        if (gender && ["Male", "Female", "Others"].includes(gender)) user.gender = gender;
        if (about) user.about = about;

        if (password) {
            user.password = await bcrypt.hash(password, 10);
        }

        await user.save();
        res.json({ message: "User updated successfully", user });
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            res.status(400).json({ error: "Invalid user ID format" });
            return;
        }

        const user = await User.findByIdAndDelete(id);
        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }

        res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};
