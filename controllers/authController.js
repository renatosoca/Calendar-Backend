import { response, request } from 'express';
import userModel from '../models/userModel.js';

const authUser = async ( req, res = response ) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });
    if ( !user ) return res.status(400).json({ ok: false, msg: 'El email no existe' });

    const validPassword = await user.matchPassword( password );
    if ( !validPassword ) return res.status(400).json({ ok: false, msg: 'Contraseña incorrecta' });

    return res.status(201).json({ ok: true, uid: user.id, name: user.name });
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, msg: 'Error del sistema' });
  }
}

const createUser = async ( req = request, res = response ) => {
  const { email } = req.body;

  try {
    const userExist = await userModel.findOne({ email });
    if ( userExist ) return res.status(400).json({ ok: false, msg: 'El email ya está en uso' });

    const user = new userModel( req.body )
    await user.save();
  
    return res.status(201).json({ ok: true, uid: user.id, name: user.name });
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