"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = __importDefault(require("../controllers/userController"));
const userRouter = (0, express_1.Router)();
// Rutas existentes
userRouter.get("/", userController_1.default.getUsers);
userRouter.get("/:id", userController_1.default.getUserById);
userRouter.post("/register", userController_1.default.register);
userRouter.post("/login", userController_1.default.login);
userRouter.delete("/:id", userController_1.default.deleteUser);
exports.default = userRouter;
