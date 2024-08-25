import { User, Prisma } from "@prisma/client";
import { UsersRepository } from "../users-repository";

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = [];

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email);

    if (!user) {
      return null;
    }

    return user;
  }
  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: "user-1",
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      date_of_birth: data.date_of_birth,
      shirt_number: data.shirt_number,
      created_at: new Date(),
    };

    this.items.push(user);

    return user;
  }
}
