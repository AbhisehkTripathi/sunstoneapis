import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../../config/database";
import { User } from "../../app/models/user.schema";
import { verifyToken } from "../../libs/jwt";

const userRepository = AppDataSource.getRepository(User);

export async function decryptAndVerifyJwt(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Authorization token missing" });
    }

    const token = authHeader.split(" ")[1];

    // 🔑 Decrypt & verify JWE
    const payload = await verifyToken(token);
    console.log("Decrypted JWE Payload:", payload);

    // 🔎 Validate user
    const user = await userRepository.findOne({
      where: { user_id: payload?.id },
    });


    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Attach user for controllers
    (req as any).user = user;
    return next();
  } catch (err: any) {
    console.error("JWT verification failed:", err.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}
