import { PrismaClient } from "@prisma/client";
import fastify from "fastify";

export const app = fastify();

const prisma = new PrismaClient();

prisma.user.create({
  data: {
    name: "Washington",
    email: "washington@example.com",
    dateOfBirth: new Date(2000, 1, 2),
    shirtNumber: 10,
  },
});
