import * as jose from "node-jose";
import fs from "fs";

const publicKeyPem = fs.readFileSync("./jwe_public.pem", "utf-8");
const privateKeyPem = fs.readFileSync("./jwe_private.pem", "utf-8");

let publicKey: jose.JWK.Key;
let privateKey: jose.JWK.Key;

(async () => {
  publicKey = await jose.JWK.asKey(publicKeyPem, "pem");
  privateKey = await jose.JWK.asKey(privateKeyPem, "pem");
})();

export async function generateJweToken(payload: object) {
  if (!publicKey) throw new Error("Public key not initialized");

  const token = await jose.JWE.createEncrypt({ format: "compact" }, publicKey)
    .update(JSON.stringify(payload))
    .final();

  return token;
}

// 🔹 Verify/Decrypt JWE using private key
export async function verifyToken(token: string) {
  if (!privateKey) throw new Error("Private key not initialized");

  const keystore = jose.JWK.createKeyStore();
  await keystore.add(privateKey);

  const result = await jose.JWE.createDecrypt(keystore).decrypt(token);
  return JSON.parse(result.payload.toString());
}
