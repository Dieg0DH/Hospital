import { Request, Response } from "express";
import {
  getAllAppointments,
  getAppointmentById,
  createAppointment,
  deleteAppointment,
  cancelAppointment,
  getAppointmentsByUserId,
} from "../services/appointmentsServices";

export class AppointmentsController {
  async getAllAppointments(req: Request, res: Response): Promise<void> {
    try {
      const appointments = await getAllAppointments();
      res.json(appointments);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving appointments" });
    }
  }

  async getAppointmentsByUserId(req: Request, res: Response): Promise<void> {
    try {
      const userId = parseInt(req.params.userId);
      const appointments = await getAppointmentsByUserId(userId);
      res.json(appointments);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving appointments" });
    }
  }

  async getAppointmentById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const appointment = await getAppointmentById(id);

      if (!appointment) {
        res.status(404).json({ message: "Appointment not found" });
        return;
      }

      res.json(appointment);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving appointment" });
    }
  }

  async createAppointment(req: Request, res: Response): Promise<void> {
    try {
      const appointment = await createAppointment(req.body);

      if (!appointment) {
        res
          .status(400)
          .json({ message: "Error creating appointment - User not found" });
        return;
      }

      res.status(201).json(appointment);
    } catch (error) {
      console.error("Error creating appointment:", error);
      res.status(500).json({ message: "Error creating appointment" });
    }
  }

  async deleteAppointment(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const deletedAppointment = await deleteAppointment(id);

      if (!deletedAppointment) {
        res.status(404).json({ message: "Appointment not found" });
        return;
      }

      res.status(200).json({
        message: "Appointment deleted successfully",
        appointment: deletedAppointment,
      });
    } catch (error) {
      res.status(500).json({ message: "Error deleting appointment" });
    }
  }

  async cancelAppointment(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const updatedAppointment = await cancelAppointment(id);

      if (!updatedAppointment) {
        res.status(404).json({ message: "Appointment not found" });
        return;
      }

      res.json({
        message: "Appointment cancelled successfully",
        appointment: updatedAppointment,
      });
    } catch (error) {
      res.status(500).json({ message: "Error cancelling appointment" });
    }
  }
}

export default new AppointmentsController();
