// utils/generateHashUtil.ts
import jsSHA from 'jssha';

export function generateHashUtil(url: string, payload: any, method: string): string {
  if (!process.env.SALT_KEY) {
    throw new Error("Missing SALT_KEY in environment variables");
  }

  let finalText: string;

  // Convert method to lower for consistency
  const methodLower = method.toLowerCase();

  if (["post", "put", "patch"].includes(methodLower)) {
    // For body-based methods
    const bodyString = JSON.stringify(payload ?? {});
    const encodedBody = Buffer.from(bodyString).toString("base64");
    finalText = encodedBody + process.env.SALT_KEY;
  } else if (["get", "delete"].includes(methodLower)) {
    // For URL-based methods
    const parsedUrl = new URL(url);
    const parsedPathAndQuery = decodeURI(parsedUrl.pathname + parsedUrl.search);
    const encodedUrl = Buffer.from(parsedPathAndQuery).toString("base64");
    finalText = encodedUrl + process.env.SALT_KEY;
  } else {
    throw new Error(`Unsupported method ${method}`);
  }

  const shaObj = new jsSHA("SHA-256", "TEXT", { encoding: "UTF8" });
  shaObj.update(finalText);

  return shaObj.getHash("HEX");
}
