import fastify from "fastify";
import { register } from "./http/controler/register";

export const app = fastify();

app.post("/users", register);
