import fastify from "fastify";
import { appRoutes } from "./http/routes";

export const { register } = fastify();

register(appRoutes);
