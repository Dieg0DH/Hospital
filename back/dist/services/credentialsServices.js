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
exports.createCredentials = exports.validateCredentials = void 0;
const data_source_1 = require("../config/data_source");
const Credentials_1 = require("../entities/Credentials");
const validateCredentials = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    const credential = yield data_source_1.CredentialRepository.findOne({
        where: { username, password },
    });
    return credential ? credential.id : null;
});
exports.validateCredentials = validateCredentials;
const createCredentials = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    const credential = new Credentials_1.Credential();
    credential.username = username;
    credential.password = password;
    return yield data_source_1.CredentialRepository.save(credential);
});
exports.createCredentials = createCredentials;
