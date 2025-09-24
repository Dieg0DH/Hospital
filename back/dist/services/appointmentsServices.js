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
exports.cancelAppointment = exports.createAppointment = exports.getAppointmentById = exports.getAllAppointments = exports.getAppointmentsByUserId = void 0;
const data_source_1 = require("../config/data_source");
const Appointments_1 = require("../entities/Appointments");
const getAppointmentsByUserId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield data_source_1.AppointmentRepository.find({
        where: {
            user: { id: userId },
        },
        relations: {
            user: true,
        },
    });
});
exports.getAppointmentsByUserId = getAppointmentsByUserId;
const getAllAppointments = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield data_source_1.AppointmentRepository.find({
        relations: {
            user: true,
        },
    });
});
exports.getAllAppointments = getAllAppointments;
const getAppointmentById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield data_source_1.AppointmentRepository.findOne({
        where: { id },
        relations: {
            user: true,
        },
    });
});
exports.getAppointmentById = getAppointmentById;
const createAppointment = (appointmentData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!appointmentData.userId) {
            console.log("No userId provided");
            return null;
        }
        const user = yield data_source_1.UserRepository.findOne({
            where: { id: appointmentData.userId },
        });
        if (!user) {
            console.log(`User with id ${appointmentData.userId} not found`);
            return null;
        }
        const appointment = new Appointments_1.Appointment();
        appointment.date = new Date(appointmentData.date);
        appointment.time = appointmentData.time;
        appointment.user = user;
        appointment.status = "active";
        const savedAppointment = yield data_source_1.AppointmentRepository.save(appointment);
        console.log("Appointment created:", savedAppointment);
        return savedAppointment;
    }
    catch (error) {
        console.error("Error creating appointment:", error);
        throw error;
    }
});
exports.createAppointment = createAppointment;
const cancelAppointment = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const appointment = yield data_source_1.AppointmentRepository.findOne({
        where: { id },
        relations: {
            user: true,
        },
    });
    if (!appointment) {
        return null;
    }
    appointment.status = "cancelled";
    return yield data_source_1.AppointmentRepository.save(appointment);
});
exports.cancelAppointment = cancelAppointment;
