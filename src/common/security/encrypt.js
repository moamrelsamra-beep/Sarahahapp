import crypto from "crypto";

const ENCRYPTION_KEY = Buffer.from("177117@@hsakusaa^%&^6$#@!fhft$365");
const IV_LENGTH = 16;
export function Encrypt(plainText) {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv("aes-256-cbc", ENCRYPTION_KEY, iv);
  let encrypted = cipher.update(plainText, "utf8", "base64");
  encrypted += cipher.final("hex");
  return iv.toString("hex") + ":" + encrypted;
}
//Decrypt Function
export function Decrypt(text) {
  const [ivHex, encryptedText] = text.split(":");
  const iv = Buffer.from(ivHex, "hex");
  const decipher = crypto.createDecipheriv("aes-256-cbc", ENCRYPTION_KEY, iv);
  let decrypted = decipher.update(encryptedText, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}
