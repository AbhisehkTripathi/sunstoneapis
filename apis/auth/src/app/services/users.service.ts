import { AppDataSource } from "../../config/database";
import { User } from "../models/user.schema";

export class UserService {
  private UserRepo: any;

  constructor() {
    this.UserRepo = AppDataSource.getRepository(User);
  }
  async register(data: any) {
    const existing = await this.UserRepo.findOne({ where: { email: data.email } });
    if (existing) {
      throw new Error("Email already registered");
    }

    const user = this.UserRepo.create(data);
    return await this.UserRepo.save(user);
  }

  async findByEmail(email: string) {
    return await this.UserRepo.findOne({ where: { email } });
  }

  async update(id: string, data: any) {
    return await this.UserRepo.update({user_id: id}, {jwt_token: data.jwt_token, jwt_expires_at: data.jwt_expires_at});
  }

  async list(data: any) {
    return await this.UserRepo.findOne({where: {user_id: data?.id}, select: ['user_id', 'email', 'jwt_token', 'jwt_expires_at']});
  }

  async refreshToken(id: string) {
    return await this.UserRepo.findOne({ where: { user_id: id }, select: ['user_id', 'email', 'jwt_token', 'jwt_expires_at'] });
  }

  async listProfile(userId: string) {
    return await this.UserRepo.findOne({
      where: { user_id: userId },
      select: ["user_id", "name", "email"],
    });
  }
  
}
