import * as jose from "node-jose";
import fs from "fs";

const publicKeyPem = fs.readFileSync("./jwe_public.pem", "utf-8");
const privateKeyPem = fs.readFileSync("./jwe_private.pem", "utf-8");

let publicKey: jose.JWK.Key | null = null;
let privateKey: jose.JWK.Key | null = null;

// Initialize keys at startup
export async function initKeys() {
  try {
    publicKey = await jose.JWK.asKey(publicKeyPem, "pem");
    privateKey = await jose.JWK.asKey(privateKeyPem, "pem");
    console.log("JWE keys initialized successfully");
  } catch (err: any) {
    console.error("UserRepo Failed to initialize JWE keys:", err.message);
    throw new Error("JWE key initialization failed");
  }
}

export async function generateJweToken(payload: object): Promise<string> {
  if (!publicKey) {
    throw new Error("Public key not initialized. Call initKeys() first.");
  }

  try {
    const token = await jose.JWE.createEncrypt({ format: "compact" }, publicKey)
      .update(JSON.stringify(payload))
      .final();
    return token;
  } catch (err: any) {
    console.error("UserRepo Failed to generate JWE token:", err.message);
    throw new Error("Token generation failed");
  }
}

export async function verifyToken(token: string): Promise<any> {
  if (!privateKey) {
    throw new Error("Private key not initialized. Call initKeys() first.");
  }

  try {
    const keystore = jose.JWK.createKeyStore();
    await keystore.add(privateKey);

    const result = await jose.JWE.createDecrypt(keystore).decrypt(token);
    return JSON.parse(result.payload.toString());
  } catch (err: any) {
    console.error("UserRepo Token verification failed:", err.message);
    throw new Error("Invalid or expired token");
  }
}
