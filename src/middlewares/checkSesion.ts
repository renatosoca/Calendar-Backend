import { NextFunction, Response } from 'express';
import { userModel } from '../models';
import { verifyJWT } from '../helpers';
import { UserRequest } from '../interfaces';

export const checkSesion = async (req: UserRequest, res: Response, next: NextFunction) => {
  let token: string | undefined;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const { _id } = verifyJWT(token);
      req.user = await userModel.findById(_id).select('-password -token -confirmed -createdAt -updatedAt -__v') ?? undefined;

      return next();
    } catch (error) {
      return res.status(401).json({ ok: false, msg: 'Sin autorización' });
    }
  }

  if (!token) return res.status(401).json({ ok: false, msg: 'JWToken no válido o inexistente' })
  return next();
}