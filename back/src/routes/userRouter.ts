import { Router } from "express";
import userController from "../controllers/userController";

const userRouter = Router();

userRouter.get("/", userController.getUsers);
userRouter.get("/:id", userController.getUserById);
userRouter.post("/register", userController.register);
userRouter.post("/login", userController.login);
userRouter.delete("/:id", userController.deleteUser);

export default userRouter;
