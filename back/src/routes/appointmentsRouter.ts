import { Router } from "express";
import appointmentsController from "../controllers/appointmentsController";

const appointmentsRouter = Router();

appointmentsRouter.get("/", appointmentsController.getAllAppointments);
appointmentsRouter.get(
  "/user/:userId",
  appointmentsController.getAppointmentsByUserId
);
appointmentsRouter.get("/:id", appointmentsController.getAppointmentById);

appointmentsRouter.post("/schedule", appointmentsController.createAppointment);

appointmentsRouter.put("/cancel/:id", appointmentsController.cancelAppointment);
appointmentsRouter.delete("/:id", appointmentsController.deleteAppointment);

export default appointmentsRouter;
