import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { Credential } from "../entities/Credentials";
import { Appointment } from "../entities/Appointments";
import dotenv from "dotenv";

dotenv.config();

if (
  !process.env.DB_HOST ||
  !process.env.DB_PORT ||
  !process.env.DB_USERNAME ||
  !process.env.DB_PASSWORD ||
  !process.env.DB_NAME
) {
  throw new Error("DB enviroment variables missing");
}

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: process.env.DB_SYNC === "true",
  logging: process.env.DB_LOGGING === "true",
  entities: [User, Credential, Appointment],
  subscribers: [],
  migrations: [],
});

export const UserRepository = AppDataSource.getRepository(User);
export const CredentialRepository = AppDataSource.getRepository(Credential);
export const AppointmentRepository = AppDataSource.getRepository(Appointment);
