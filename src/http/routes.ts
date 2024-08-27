import { FastifyInstance } from "fastify";
import { register } from "./controler/register";
import { authenticate } from "./controler/authenticate";

export const appRoutes = async (app: FastifyInstance) => {
  app.post("/users", register);
  app.post("/sessions", authenticate);
};
