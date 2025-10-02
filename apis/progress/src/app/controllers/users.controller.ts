import { Request, Response } from "express";
import UserService from "../services/users.service";
import { generateJweToken, verifyToken } from "../../libs/jwt";
export default class UserController {
  static async register(req: Request, res: Response) {
    try {
      const service = new UserService();
      const user = await service.register(req.body);
      return res.status(201).json({ user });
    } catch (err: any) {
      return res.status(400).json({ message: err.message });
    }
  }

  static async list(req: Request, res: Response) {
    const service = new UserService();
    const users = await service.list();
    return res.status(200).json(users);
  }

  static async login(req: Request, res: Response) {
    try {
      
      const service = new UserService();
      const user = await service.login(req.body);
      const token = await generateJweToken({ id: user.id, email: user.email });
      console.log("token",token)
      return res.status(200).json({ user, token });
    } catch (err: any) {
      return res.status(400).json({ message: err.message });
    }
  }
}
