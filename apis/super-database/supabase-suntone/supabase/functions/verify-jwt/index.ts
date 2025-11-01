import { jwtVerify, decodeProtectedHeader, importSPKI, JWTPayload } from "jose";

const PUBLIC_KEY_PEM = Deno.env.get("JWT_PUBLIC_KEY");

function jsonResponse(body: Record<string, unknown>, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

async function importPublicKey(pem: string, alg: string): Promise<CryptoKey> {
  try {
    // Clean the PEM string - remove headers/footers and whitespace
    const cleanPem = pem
      .replace(/-----BEGIN (?:RSA |EC |)?PUBLIC KEY-----/g, '')
      .replace(/-----END (?:RSA |EC |)?PUBLIC KEY-----/g, '')
      .replace(/\s+/g, '')
      .trim();

    

    // Convert base64 to ArrayBuffer
    const binaryDer = Uint8Array.from(atob(cleanPem), c => c.charCodeAt(0));

    // Import the key based on the algorithm
    if (alg.startsWith('RS')) {
      return await crypto.subtle.importKey(
        'spki',
        binaryDer,
        {
          name: 'RSASSA-PKCS1-v1_5',
          hash: { name: 'SHA-256' }, // Use SHA-384 or SHA-512 for other algorithms if needed
        },
        true,
        ['verify']
      );
    } else if (alg.startsWith('ES')) {
      return await crypto.subtle.importKey(
        'spki',
        binaryDer,
        {
          name: 'ECDSA',
          namedCurve: 'P-256', // Adjust based on your key size
        },
        true,
        ['verify']
      );
    } else {
      throw new Error(`Unsupported algorithm: ${alg}`);
    }
  } catch (err) {
    throw new Error(`Failed to import public key: ${err instanceof Error ? err.message : String(err)}`);
  }
}

// Alternative approach using jose's importSPKI (preferred if working)
async function importPublicKeyWithJose(pem: string, alg: string): Promise<CryptoKey> {
  try {
    // Ensure the PEM has proper headers
    let formattedPem = pem.trim();
    if (!formattedPem.includes('-----BEGIN')) {
      formattedPem = `-----BEGIN PUBLIC KEY-----\n${formattedPem}\n-----END PUBLIC KEY-----`;
    }
    
    return await importSPKI(formattedPem, alg, {
      extractable: true,
    });
  } catch (err) {
    throw new Error(`Failed to import SPKI public key: ${err instanceof Error ? err.message : String(err)}`);
  }
}

Deno.serve(async (req: Request): Promise<Response> => {
  try {
    const authHeader = req.headers.get("authorization") ?? "";

    if (!authHeader.startsWith("Bearer ")) {
      return jsonResponse({ msg: "Invalid JWT" }, 401);
    }

    const token = authHeader.slice(7).trim();

    // Decode JWT header
    let header;
    try {
      header = decodeProtectedHeader(token);
    } catch (err) {
      return jsonResponse({ 
        msg: "Invalid JWT",
        details: err instanceof Error ? err.message : String(err),
      }, 401);
    }

    const alg = header.alg;
    if (!alg) {
      return jsonResponse({ msg: "Invalid JWT" }, 401);
    }

    if (alg.startsWith("HS")) {
      return jsonResponse({ 
        msg: "Invalid JWT",
        details: "HMAC tokens not supported with public key verification",
      }, 401);
    }

    if (!PUBLIC_KEY_PEM) {
      console.error("Server configuration error: JWT_PUBLIC_KEY not set");
      return jsonResponse({ 
        msg: "Invalid JWT",
        details: "Server configuration error",
      }, 401);
    }

    // Import key for verification
    let cryptoKey: CryptoKey;
    try {
      // Try the jose method first, fallback to manual import if needed
      cryptoKey = await importPublicKeyWithJose(PUBLIC_KEY_PEM, alg);
    } catch (err) {
      console.error("Failed to import public key with jose, trying manual import:", err);
      try {
        cryptoKey = await importPublicKey(PUBLIC_KEY_PEM, alg);
      } catch (importErr) {
        console.error("Failed to import public key:", importErr);
        return jsonResponse({ 
          msg: "Invalid JWT",
          details: "Token verification failed - key import error",
        }, 401);
      }
    }

    // Verify JWT
    try {
      const verified = await jwtVerify(token, cryptoKey, { 
        algorithms: [alg] 
      });
      const payload: JWTPayload = verified.payload;

      return jsonResponse({ 
        user: payload,
        valid: true 
      }, 200);
    } catch (err) {
      console.error("JWT verification failed:", err);
      return jsonResponse({ 
        msg: "Invalid JWT",
        details: "Token verification failed",
      }, 401);
    }
  } catch (err) {
    console.error("Unexpected error:", err);
    return jsonResponse({ 
      msg: "Invalid JWT",
      details: "Internal server error",
    }, 401);
  }
});