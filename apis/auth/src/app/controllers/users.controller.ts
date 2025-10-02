import { Request, Response } from "express";
import { UserService } from "../services/users.service";
import { registerSchema, loginSchema } from "../validators/user.validator";
import { generateJweToken } from "../../libs/jwt";
import { successResponse, errorResponse } from "../../utils/response";
import { verifyToken } from "../../libs/jwt";
import Controller from "../../libs/Controller";

export default class UserController extends Controller {
  
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
      const user: any = await service.findByEmail(value.email);
      if (!user) {
        return errorResponse(res, 404, "User not found");
      }

      const token = await generateJweToken({
        id: user.user_id,
        email: user.email,
      });
      if (!token) {
        return errorResponse(res, 500, "Internal Server Error");
      }

      const data = {
        jwt_token: token,
        jwt_expires_at: new Date(Date.now() + 60 * 60 * 1000)
      }
      const updatedUserToken = await service.update(user.user_id, data);
      if (!updatedUserToken) {
        return errorResponse(res, 500, "Internal Server Error");
      }

      return successResponse(res, 201, "Login successful", { user, token });
    } catch (err: any) {
      return errorResponse(res, 500, "Internal Server Error", err.message);
    }
  }

  static async list(req: Request, res: Response) {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Authorization token missing" });
      }

      const token = authHeader.split(" ")[1];
      const payload = await verifyToken(token);
      console.log("Decrypted JWE Payload:", payload);

      const service = new UserService();
      const usersData = await service.list(payload);
      if (!usersData) {
        return errorResponse(res, 404, "Users not found");
      }
      return successResponse(res, 200, "Users fetched successfully", usersData);
    } catch (err: any) {
      return errorResponse(res, 500, "Internal Server Error", err.message);
    }
  }

  static async refreshToken(req: Request, res: Response) {
    try {
      const service = new UserService();
      const user = await service.refreshToken(req.body);

      return successResponse(res, 200, "Token refreshed successfully", user);
    } catch (err: any) {
      return errorResponse(res, 500, "Internal Server Error", err.message);
    }
  }
  static async profileInfo(req: Request, res: Response) {
    try {
      let userId: string;
  
      const authHeader = req.headers.authorization;
  
      if (authHeader && authHeader.startsWith("Bearer ")) {
        const token = authHeader.split(" ")[1];
        const payload = await verifyToken(token);
        console.log("Decrypted JWE Payload:", payload);
  
        if (!payload.id) {
          return res.status(400).json({ message: "Invalid token payload" });
        }
        userId = payload.id;
      } else if (req.headers["x-user-id"]) {
        userId = req.headers["x-user-id"] as string;
        if (!userId) {
          return res.status(401).json({ message: "User ID missing in headers" });
        }
      } else {
        return res.status(401).json({
          message: "Authorization token missing and no user_id provided",
        });
      }
  
      const service = new UserService();
      const userData = await service.listProfile(userId);
      
      if (!userData) {
        return res.status(404).json({ message: "User not found" });
      }
  
      return successResponse(res, 200, "User data fetched successfully", userData);
    } catch (err: any) {
      console.error("Profile fetch failed:", err.message);
      return errorResponse(res, 500, "Internal Server Error", err.message);
    }
  }
  
}
