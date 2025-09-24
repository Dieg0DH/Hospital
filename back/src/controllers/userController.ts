import { Request, Response } from "express";
import {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
  getUserByCredentials,
} from "../services/usersService";

export class UserController {
  async getUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await getAllUsers();
      res.json(users);
    } catch (error) {
      console.error("Error retrieving users:", error);
      res.status(500).json({ message: "Error retrieving users" });
    }
  }

  async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const user = await getUserById(id);

      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      res.json(user);
    } catch (error) {
      console.error("Error retrieving user:", error);
      res.status(500).json({ message: "Error retrieving user" });
    }
  }

  async register(req: Request, res: Response): Promise<void> {
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

      const newUser = await createUser(req.body);
      res.status(201).json(newUser);
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(400).json({ message: "Error creating user" });
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        res.status(400).json({ message: "Username and password are required" });
        return;
      }

      const user = await getUserByCredentials(username, password);

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
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const success = await deleteUser(id);

      if (!success) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      res.json({ message: "User deleted successfully" });
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(400).json({ message: "Error deleting user" });
    }
  }
}

export default new UserController();
