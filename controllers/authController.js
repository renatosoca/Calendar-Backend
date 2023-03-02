import { response, request } from 'express';
import userModel from '../models/userModel.js';

const authUser = ( req, res = response ) => {
  const { email, password } = req.body;

  res.status(201).json({ ok: true, page: 'login' });
}

const createUser = async ( req = request, res = response ) => {
  const { email, password } = req.body;

  try {
    const userExist = await userModel.findOne({ email });
    if ( userExist ) return res.status(400).json({ ok: false, msg: 'El email ya está en uso' });

    const user = new userModel( req.body )
    await user.save();
  
    res.status(201).json({ ok: true, uid: user.id, name: user.name });
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, msg: 'Error del sistema' });
  }
}

const revalidateToken = ( req, res = response ) => {
  res.status(201).json({ ok: true, page: 'tokens' });
}

export {
  authUser,
  createUser,
  revalidateToken,
}