import express from "express";
import authMiddlaware from "../middlaware/auth.middlaware.js";
import roleMiddleware from "../middlaware/role.middleware.js";
import userController from "../controllers/user.controller.js";

const userRoute = express.Router()

userRoute.use(authMiddlaware.verifyToken.bind(authMiddlaware))

userRoute.post('/',roleMiddleware.isAdmin.bind(roleMiddleware),userController.CreateUser.bind(userController))
userRoute.get('/',roleMiddleware.isAdmin.bind(roleMiddleware),userController.getAllUsers.bind(userController))
userRoute.put('/:id',roleMiddleware.isAdmin.bind(roleMiddleware),userController.updateUser.bind(userController))
userRoute.delete('/:id',roleMiddleware.isAdmin.bind(roleMiddleware),userController.deleteUser.bind(userController))

export default userRoute