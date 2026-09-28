import "server-only";
import { createHash, randomBytes, timingSafeEqual } from "node:crypto";

export const createSecureToken = () => randomBytes(32).toString("base64url");
export const hashToken = (token) => createHash("sha256").update(token).digest("hex");
export function safeCompareHash(value, expectedHash) {
  const actual = Buffer.from(hashToken(value), "hex"); const expected = Buffer.from(expectedHash || "", "hex");
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}
