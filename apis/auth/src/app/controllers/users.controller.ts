import { Request, Response } from "express";
import { UserService } from "../services/users.service";
import { registerSchema, loginSchema } from "../validators/user.validator";
import { generateJweToken } from "../../libs/jwt";
import { successResponse, errorResponse } from "../../utils/response";

export default class UserController {
  static async register(req: Request, res: Response) {
    try {
      const { error, value } = registerSchema.validate(req.body);
      if (error) {
        return errorResponse(res, 400, "Validation failed", error.details);
      }

      const service = new UserService();
      const user = await service.register(value);

      return successResponse(res, 201, "User registered successfully", user);
    } catch (err: any) {
      if (err.message === "Email already registered") {
        return errorResponse(res, 409, err.message);
      }
      return errorResponse(res, 500, "Internal Server Error", err.message);
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { error, value } = loginSchema.validate(req.body);
      if (error) {
        return errorResponse(res, 400, "Validation failed", error.details);
      }

      const service = new UserService();
      const user:any = await service.findByEmail(value.email);

      if (!user) {
        return errorResponse(res, 404, "User not found");
      }

      const token = await generateJweToken({
        id: user.id,
        email: user.email,
      });

      return successResponse(res, 200, "Login successful", { user, token });
    } catch (err: any) {
      return errorResponse(res, 500, "Internal Server Error", err.message);
    }
  }

  static async list(req: Request, res: Response) {
    try {
      const service = new UserService();
      const users = await service.list();

      return successResponse(res, 200, "Users fetched successfully", users);
    } catch (err: any) {
      return errorResponse(res, 500, "Internal Server Error", err.message);
    }
  }
}
