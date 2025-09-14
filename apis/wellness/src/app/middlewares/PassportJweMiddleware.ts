import { Request, Response, NextFunction } from "express";
import * as jose from "node-jose";
import { AppDataSource } from "../../config/database";
import { User } from "../../app/models/user.schema";
import fs from "fs";

const userRepository = AppDataSource.getRepository(User);

// 🔹 Build keystore once at startup
let keystore: jose.JWK.KeyStore;

(async () => {
  keystore = jose.JWK.createKeyStore();
  // const privateKeyPem = Buffer.from(process.env.JWT_PRIVATE_KEY!, "base64").toString("utf-8");
  const privateKeyPem = fs.readFileSync("./jwe_private.pem", "utf-8");

  await keystore.add(privateKeyPem, "pem");
})();

export async function decryptAndVerifyJwt(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.headers.wellnessorization?.split(" ")[1];

    if (!token) {
      return res.status(401).send({ message: "No token provided." });
    }

    // Decrypt JWE with private key
    const decryptedResult = await jose.JWE.createDecrypt(keystore).decrypt(token);
    const decryptedPayload = JSON.parse(decryptedResult.payload.toString());
    console.log("decryptedPayload",decryptedPayload)
    // Exp check
    if (Date.now() >= decryptedPayload.exp) {
      return res.status(401).send({ message: "Token is expired, please login again." });
    }

    // Lookup user
    const user = await userRepository.findOne({
      where: { id: decryptedPayload.id },
      select: ["id"],
    });
    if (!user) {
      return res.status(401).send({ message: "User not found.", errorcode: 401 });
    }

    req.user = user;
    return next();
  } catch (err: any) {
    console.error("JWT verification failed:", err.message);
    return res.status(401).send({ message: "Failed to wellnessenticate token.", errorcode: 401 });
  }
}

