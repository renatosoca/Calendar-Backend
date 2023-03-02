import { response, request } from 'express';
import userModel from '../models/userModel.js';
import generateJWT from '../helpers/generateJWT.js';

const authUser = async ( req, res = response ) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });
    if ( !user ) return res.status(400).json({ ok: false, msg: 'El email no existe' });

    //if ( !user.confirmed ) return res.status(400).json({ ok: false, msg: 'El email no ha sido confirmado' });

    const validPassword = await user.matchPassword( password );
    if ( !validPassword ) return res.status(400).json({ ok: false, msg: 'Contraseña incorrecta' });

    const { _id, name } = user;

    return res.status(201).json({ 
      ok: true,
      _id,
      name,
      jwt:  generateJWT( _id, name ),
    });
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
    const savedUser = await user.save();

    const { _id, name } = savedUser;

    return res.status(201).json({ 
      ok: true,
      _id,
      name,
      token: generateJWT( _id, name ),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ 
      ok: false, 
      msg: 'Error del sistema' 
    });
  }
}

const revalidateToken = ( req, res = response ) => {
  const { _id, name } = req.user;

  res.status(201).json({ 
    ok: true,
    token: generateJWT( _id, name ),
  });
}

export {
  authUser,
  createUser,
  revalidateToken,
}