export interface IUser {
  id: number;
  name: string;
  email: string;
  birthdate: Date;
  nDni: string;
  credentialsId: number;
}

export interface IAppointment {
  id: number;
  date: Date;
  time: string;
  userId: number;
  status: "active" | "cancelled";
}

export interface ICredential {
  id: number;
  username: string;
  password: string;
}
