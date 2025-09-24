import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  OneToMany,
} from "typeorm";
import { Credential } from "./Credentials";
import { Appointment } from "./Appointments";

@Entity({
  name: "users",
})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 100,
  })
  name: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  birthdate: Date;

  @Column()
  nDni: string;

  @OneToOne(() => Credential, (credential) => credential.user)
  credential: Credential;

  @OneToMany(() => Appointment, (appointment) => appointment.user)
  appointments: Appointment[];
}
