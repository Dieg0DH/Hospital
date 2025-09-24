import express from "express";
import cors from "cors";
import morgan from "morgan";
import userRouter from "./routes/userRouter";
import appointmentsRouter from "./routes/appointmentsRouter";

const server = express();

server.use(express.json());
server.use(cors());
server.use(morgan("dev"));

server.use("/users", userRouter);
server.use("/appointments", appointmentsRouter);

export default server;
