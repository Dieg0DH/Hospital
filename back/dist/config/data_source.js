"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentRepository = exports.CredentialRepository = exports.UserRepository = exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("../entities/User");
const Credentials_1 = require("../entities/Credentials");
const Appointments_1 = require("../entities/Appointments");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
if (!process.env.DB_HOST ||
    !process.env.DB_PORT ||
    !process.env.DB_USERNAME ||
    !process.env.DB_PASSWORD ||
    !process.env.DB_NAME) {
    throw new Error("DB enviroment variables missing");
}
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: process.env.DB_SYNC === "true",
    logging: process.env.DB_LOGGING === "true",
    entities: [User_1.User, Credentials_1.Credential, Appointments_1.Appointment],
    subscribers: [],
    migrations: [],
});
exports.UserRepository = exports.AppDataSource.getRepository(User_1.User);
exports.CredentialRepository = exports.AppDataSource.getRepository(Credentials_1.Credential);
exports.AppointmentRepository = exports.AppDataSource.getRepository(Appointments_1.Appointment);
