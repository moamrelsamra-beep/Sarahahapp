
 import { hash, compare } from "bcryptjs"; 

export const Hash = async (password, SALT_ROUNDS = 12) => {
  return await hash(password, SALT_ROUNDS);
};

export async function CompareHash(password, hashedPassword) {
  return await compare(password, hashedPassword); 
}