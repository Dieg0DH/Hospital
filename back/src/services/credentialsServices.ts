import { CredentialRepository } from "../config/data_source";
import { Credential } from "../entities/Credentials";

export const validateCredentials = async (
  username: string,
  password: string
): Promise<number | null> => {
  const credential = await CredentialRepository.findOne({
    where: { username, password },
  });
  return credential ? credential.id : null;
};

export const createCredentials = async (
  username: string,
  password: string
): Promise<Credential> => {
  const credential = new Credential();
  credential.username = username;
  credential.password = password;
  return await CredentialRepository.save(credential);
};
