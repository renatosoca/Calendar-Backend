import { sign, verify } from 'jsonwebtoken';
import { ObjectId } from 'mongoose';

export const generateJWT = (_id: string | ObjectId, email: string) => {
  const jwtKeySecret: string = process.env.KEY_SECRET_JWT || '';

  return sign({ _id, email }, jwtKeySecret, { expiresIn: '2h' });
}

export const verifyJWT = (token: string): { _id: string, email: string } => {
  const jwtKeySecret: string = process.env.KEY_SECRET_JWT || '';

  return verify(token, jwtKeySecret) as { _id: string, email: string };
}