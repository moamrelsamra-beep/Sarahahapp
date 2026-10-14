
 import { hashSync, compareSync } from "bcryptjs"; 

export const Hash = async (password, SALT_ROUNDS = 12) => {
  return hashSync(password, SALT_ROUNDS);
};

export const Compare = (plainText, cipherText) => {
  return compareSync(plainText, cipherText); 
}