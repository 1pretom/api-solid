import { FastifyInstance } from "fastify";
import { register } from "./controler/register";

export const appRoutes = async (app: FastifyInstance) => {
  app.post("/users", register);
};
