import { AppDataSource } from "../../config/database";
import { User } from "../models/user.schema";
import bcrypt from "bcryptjs";

export default class UserService {
  private userRepo = AppDataSource.getRepository(User);

  async register(data: { name: string; email: string; username: string; password: string }) {
    const existing = await this.userRepo.findOne({ where: { email: data.email } });
    if (existing) {
      throw new Error("Email already registered");
    }

    const user = new User();
    user.name = data.name;
    user.email = data.email;
    user.username = data.username;
    user.password_hash = await bcrypt.hash(data.password, 10);

    return await this.userRepo.save(user);
  }

  async list() {
    return await this.userRepo.find();
  }

  async login(data: { email: string; password: string }) {
    const user = await this.userRepo.findOne({ where: { email: data.email } });
    if (!user) {
      throw new Error("User not found");
    }
    const isMatch = await bcrypt.compare(data.password, user.password_hash);
    if (!isMatch) {
      throw new Error("Invalid password");
    }
    return user;
  }
}
