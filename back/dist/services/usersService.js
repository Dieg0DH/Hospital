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
exports.deleteUser = exports.getUserByCredentials = exports.createUser = exports.getUserById = exports.getAllUsers = void 0;
const data_source_1 = require("../config/data_source");
const User_1 = require("../entities/User");
const credentialsServices_1 = require("./credentialsServices");
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield data_source_1.UserRepository.find({
        relations: {
            credential: true,
            appointments: true,
        },
    });
});
exports.getAllUsers = getAllUsers;
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield data_source_1.UserRepository.findOne({
        where: { id },
        relations: {
            credential: true,
            appointments: true,
        },
    });
});
exports.getUserById = getUserById;
const createUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Crear las credenciales primero
        const credential = yield (0, credentialsServices_1.createCredentials)(userData.username, userData.password);
        // Crear el usuario
        const user = new User_1.User();
        user.name = userData.name;
        user.email = userData.email;
        user.birthdate = new Date(userData.birthdate);
        user.nDni = userData.nDni;
        user.credential = credential;
        // Guardar el usuario
        return yield data_source_1.UserRepository.save(user);
    }
    catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }
});
exports.createUser = createUser;
const getUserByCredentials = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    const credentialId = yield (0, credentialsServices_1.validateCredentials)(username, password);
    if (!credentialId) {
        return null;
    }
    const user = yield data_source_1.UserRepository.findOne({
        where: { credential: { id: credentialId } },
        relations: {
            credential: true,
            appointments: true,
        },
    });
    return user;
});
exports.getUserByCredentials = getUserByCredentials;
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield data_source_1.UserRepository.findOne({
            where: { id },
            relations: {
                credential: true,
                appointments: true,
            },
        });
        if (!user) {
            return false;
        }
        // 1st eliminamos las citas asociadas
        if (user.appointments) {
            yield data_source_1.AppointmentRepository.remove(user.appointments);
        }
        // 2nd eliminamos las credenciales
        if (user.credential) {
            yield data_source_1.CredentialRepository.remove(user.credential);
        }
        // 3rd eliminamos el usuario
        yield data_source_1.UserRepository.remove(user);
        return true;
    }
    catch (error) {
        console.error("Error deleting user:", error);
        throw error;
    }
});
exports.deleteUser = deleteUser;
