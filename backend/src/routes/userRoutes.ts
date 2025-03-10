import express from 'express';
import { createUser,getUsers,getUserById,updateUser,deleteUser } from "../controllers/userController";

const userrouters = express.Router();

userrouters.post("/", createUser);
userrouters.get("/", getUsers);
userrouters.get("/:id", getUserById);
userrouters.put("/:id", updateUser);
userrouters.delete("/:id", deleteUser);

export default userrouters;