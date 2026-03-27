import crypto from "crypto";

const SECRET = process.env.LINK_SECRET;

export function generateSignature(data) {
  return crypto
    .createHmac("sha256", SECRET)
    .update(JSON.stringify(data))
    .digest("hex");
}

export function verifySignature(data, signature) {
  const expected = generateSignature(data);
  // Using timingSafeEqual to prevent timing attacks
  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature));
}