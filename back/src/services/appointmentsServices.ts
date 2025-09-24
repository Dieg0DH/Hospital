import { AppointmentRepository, UserRepository } from "../config/data_source";
import { Appointment } from "../entities/Appointments";
import { CreateAppointmentDto } from "../dto/AppointmentDto";

export const getAppointmentsByUserId = async (
  userId: number
): Promise<Appointment[]> => {
  return await AppointmentRepository.find({
    where: {
      user: { id: userId },
    },
    relations: {
      user: true,
    },
  });
};

export const getAllAppointments = async (): Promise<Appointment[]> => {
  return await AppointmentRepository.find({
    relations: {
      user: true,
    },
  });
};

export const getAppointmentById = async (
  id: number
): Promise<Appointment | null> => {
  return await AppointmentRepository.findOne({
    where: { id },
    relations: {
      user: true,
    },
  });
};

export const createAppointment = async (
  appointmentData: CreateAppointmentDto
): Promise<Appointment | null> => {
  try {
    if (!appointmentData.userId) {
      console.log("No userId provided");
      return null;
    }

    const user = await UserRepository.findOne({
      where: { id: appointmentData.userId },
    });

    if (!user) {
      console.log(`User with id ${appointmentData.userId} not found`);
      return null;
    }

    const appointment = new Appointment();
    appointment.date = new Date(appointmentData.date);
    appointment.time = appointmentData.time;
    appointment.user = user;
    appointment.status = "active";

    const savedAppointment = await AppointmentRepository.save(appointment);
    console.log("Appointment created:", savedAppointment);
    return savedAppointment;
  } catch (error) {
    console.error("Error creating appointment:", error);
    throw error;
  }
};

export const deleteAppointment = async (
  id: number
): Promise<Appointment | null> => {
  try {
    const appointment = await AppointmentRepository.findOne({
      where: { id },
      relations: { user: true },
    });

    if (!appointment) {
      return null;
    }

    const deleteResult = await AppointmentRepository.delete(id);

    if (deleteResult.affected === 0) {
      return null;
    }
    return appointment;
  } catch (error) {
    console.error("Error deleting appointment:", error);
    throw error;
  }
};

export const cancelAppointment = async (
  id: number
): Promise<Appointment | null> => {
  const appointment = await AppointmentRepository.findOne({
    where: { id },
    relations: {
      user: true,
    },
  });

  if (!appointment) {
    return null;
  }

  appointment.status = "cancelled";
  return await AppointmentRepository.save(appointment);
};
