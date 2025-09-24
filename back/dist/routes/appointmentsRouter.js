"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const appointmentsController_1 = __importDefault(require("../controllers/appointmentsController"));
const appointmentsRouter = (0, express_1.Router)();
appointmentsRouter.get("/user/:userId", appointmentsController_1.default.getAppointmentsByUserId);
appointmentsRouter.get("/", appointmentsController_1.default.getAllAppointments);
appointmentsRouter.get("/:id", appointmentsController_1.default.getAppointmentById);
appointmentsRouter.post("/schedule", appointmentsController_1.default.createAppointment);
appointmentsRouter.put("/cancel/:id", appointmentsController_1.default.cancelAppointment);
exports.default = appointmentsRouter;
