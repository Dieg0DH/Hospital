"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const usersService_1 = require("../services/usersService");
class UserController {
  getUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const users = yield (0, usersService_1.getAllUsers)();
        res.json(users);
      } catch (error) {
        console.error("Error retrieving users:", error);
        res.status(500).json({ message: "Error retrieving users" });
      }
    });
  }
  getUserById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const id = parseInt(req.params.id);
        const user = yield (0, usersService_1.getUserById)(id);
        if (!user) {
          res.status(404).json({ message: "User not found" });
          return;
        }
        res.json(user);
      } catch (error) {
        console.error("Error retrieving user:", error);
        res.status(500).json({ message: "Error retrieving user" });
      }
    });
  }
  register(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        if (
          !req.body.name ||
          !req.body.email ||
          !req.body.username ||
          !req.body.password ||
          !req.body.nDni ||
          !req.body.birthdate
        ) {
          res.status(400).json({ message: "Missing required fields" });
          return;
        }
        const newUser = yield (0, usersService_1.createUser)(req.body);
        res.status(201).json(newUser);
      } catch (error) {
        console.error("Error creating user:", error);
        res.status(400).json({ message: "Error creating user" });
      }
    });
  }
  login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const { username, password } = req.body;
        if (!username || !password) {
          res
            .status(400)
            .json({ message: "Username and password are required" });
          return;
        }
        const user = yield (0, usersService_1.getUserByCredentials)(
          username,
          password
        );
        if (!user) {
          res.status(401).json({ message: "Invalid username or password" });
          return;
        }
        res.json({
          login: true,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            birthdate: user.birthdate,
            nDni: user.nDni,
          },
        });
      } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ message: "Error logging in" });
      }
    });
  }
  deleteUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const id = parseInt(req.params.id);
        const success = yield (0, usersService_1.deleteUser)(id);
        if (!success) {
          res.status(404).json({ message: "User not found" });
          return;
        }
        res.json({ message: "User deleted successfully" });
      } catch (error) {
        console.error("Error deleting user:", error);
        res.status(400).json({ message: "Error deleting user" });
      }
    });
  }
}
exports.UserController = UserController;
exports.default = new UserController();
