import { PrismaClient } from "@prisma/client";
import fastify from "fastify";

export const app = fastify();

const prisma = new PrismaClient();

prisma.user.create({
  data: {
    name: "Washington luis",
    email: "washington@example.com",
    date_of_birth: new Date(2000, 1, 2),
    shirt_number: 10,
    password_hash: '123'
  },
});
