import { UsersRepository } from "@/repositories/users-repository";
import { User, Prisma } from "@prisma/client";

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
      date_of_birth: "data.date_of_birth",
      shirt_number: data.shirt_number,
      created_at: data.created_at,
    };

    this.items.push(user);

    return user;
  }
}
