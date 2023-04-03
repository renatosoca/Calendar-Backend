import { compareSync, genSaltSync, hashSync } from 'bcrypt';

export const hashPassword = (password: string): string => {
  const salt = genSaltSync(10)
  return hashSync(password, salt);
}

export const comparePassword = (password: string, paswordHash: string): boolean => {
  return compareSync(password, paswordHash);
}