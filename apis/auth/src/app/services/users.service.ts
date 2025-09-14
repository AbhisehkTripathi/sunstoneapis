import { AppDataSource } from "../../config/database";
import { User } from "../models/user.schema";

export class UserService {
  private repo = AppDataSource.getRepository(User);

  async register(data: any) {
    const existing = await this.repo.findOne({ where: { email: data.email } });
    if (existing) {
      throw new Error("Email already registered");
    }

    const user = this.repo.create(data);
    return await this.repo.save(user);
  }

  async findByEmail(email: string) {
    return await this.repo.findOne({ where: { email } });
  }

  async list() {
    return await this.repo.find();
  }
}
