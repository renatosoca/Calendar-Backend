import { response } from 'express';
import jwtoken from 'jsonwebtoken';
import userModel from '../models/userModel.js';

const jwtValidator = async ( req, res = response, next ) => {
  const token = req.header('x-token');
  if ( !token ) return res.status(401).json({ ok: false, msg: 'No hay token en la petición' });
  
  try {

    const payload = jwtoken.verify( token, process.env.KEY_SECRET_JWT );
    req.user = await userModel.findById( payload._id ).select('-password -token -confirmed -createdAt -__v');
    
  } catch (error) {
    return res.status(401).json({ ok: false, msg: 'jwtoken no válido' });
  }

  next();
}

export default jwtValidator;