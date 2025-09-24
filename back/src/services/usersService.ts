import { IUser } from "../interfaces/Interfaces";
import { CreateUserDto } from "../dto/UserDto";
import {
  UserRepository,
  CredentialRepository,
  AppointmentRepository,
} from "../config/data_source";
import { User } from "../entities/User";
import { Credential } from "../entities/Credentials";
import { createCredentials, validateCredentials } from "./credentialsServices";

export const getAllUsers = async (): Promise<User[]> => {
  return await UserRepository.find({
    relations: {
      credential: true,
      appointments: true,
    },
  });
};

export const getUserById = async (id: number): Promise<User | null> => {
  return await UserRepository.findOne({
    where: { id },
    relations: {
      credential: true,
      appointments: true,
    },
  });
};

export const createUser = async (userData: CreateUserDto): Promise<User> => {
  try {
    // Create credentials
    const credential = await createCredentials(
      userData.username,
      userData.password
    );

    // Create user
    const user = new User();
    user.name = userData.name;
    user.email = userData.email;
    user.birthdate = new Date(userData.birthdate);
    user.nDni = userData.nDni;
    user.credential = credential;

    // Save user
    return await UserRepository.save(user);
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

export const getUserByCredentials = async (
  username: string,
  password: string
): Promise<User | null> => {
  const credentialId = await validateCredentials(username, password);

  if (!credentialId) {
    return null;
  }

  const user = await UserRepository.findOne({
    where: { credential: { id: credentialId } },
    relations: {
      credential: true,
      appointments: true,
    },
  });

  return user;
};

export const deleteUser = async (id: number): Promise<boolean> => {
  try {
    const user = await UserRepository.findOne({
      where: { id },
      relations: {
        credential: true,
        appointments: true,
      },
    });

    if (!user) {
      return false;
    }

    // 1st delete appointments
    if (user.appointments) {
      await AppointmentRepository.remove(user.appointments);
    }

    // 2nd delete credentials
    if (user.credential) {
      await CredentialRepository.remove(user.credential);
    }

    // 3rd delete user
    await UserRepository.remove(user);

    return true;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};
