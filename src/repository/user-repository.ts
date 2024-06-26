import { User } from "../model/user";

export interface UserRepository {
  create(user: User): Promise<void>;
  findById(id: string): Promise<User | null>;
}
