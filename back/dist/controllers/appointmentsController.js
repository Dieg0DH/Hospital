"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentsController = void 0;
const appointmentsServices_1 = require("../services/appointmentsServices");
class AppointmentsController {
    getAllAppointments(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const appointments = yield (0, appointmentsServices_1.getAllAppointments)();
                res.json(appointments);
            }
            catch (error) {
                res.status(500).json({ message: "Error al obtener los turnos" });
            }
        });
    }
    getAppointmentsByUserId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = parseInt(req.params.userId);
                const appointments = yield (0, appointmentsServices_1.getAppointmentsByUserId)(userId);
                res.json(appointments);
            }
            catch (error) {
                res.status(500).json({ message: "Error al obtener los turnos" });
            }
        });
    }
    getAppointmentById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                const appointment = yield (0, appointmentsServices_1.getAppointmentById)(id);
                if (!appointment) {
                    res.status(404).json({ message: "Turno no encontrado" });
                    return;
                }
                res.json(appointment);
            }
            catch (error) {
                res.status(500).json({ message: "Error al obtener el turno" });
            }
        });
    }
    createAppointment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const appointment = yield (0, appointmentsServices_1.createAppointment)(req.body);
                if (!appointment) {
                    res
                        .status(400)
                        .json({ message: "Error al crear el turno - Usuario no encontrado" });
                    return;
                }
                res.status(201).json(appointment);
            }
            catch (error) {
                console.error("Error al crear el turno:", error);
                res.status(500).json({ message: "Error interno al crear el turno" });
            }
        });
    }
    cancelAppointment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                const updatedAppointment = yield (0, appointmentsServices_1.cancelAppointment)(id);
                if (!updatedAppointment) {
                    res.status(404).json({ message: "Turno no encontrado" });
                    return;
                }
                res.json({
                    message: "Turno cancelado exitosamente",
                    appointment: updatedAppointment,
                });
            }
            catch (error) {
                res.status(500).json({ message: "Error al cancelar el turno" });
            }
        });
    }
}
exports.AppointmentsController = AppointmentsController;
exports.default = new AppointmentsController();
