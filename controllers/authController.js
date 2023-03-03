import { response, request } from 'express';
import userModel from '../models/userModel.js';
import generateJWT from '../helpers/generateJWT.js';
import generateToken from '../helpers/generateToken.js';

const authUser = async ( req = request, res = response ) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });
    if ( !user ) return res.status(400).json({ ok: false, msg: 'No existe un usuario con este email' });

    //if ( !user.confirmed ) return res.status(400).json({ ok: false, msg: 'El email no ha sido confirmado' });

    const validPassword = await user.matchPassword( password );
    if ( !validPassword ) return res.status(400).json({ ok: false, msg: 'Contraseña incorrecta' });

    const { _id, name } = user;

    return res.status(201).json({ 
      ok: true,
      _id,
      name,
      email,
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
      msg: 'Error del sistema, comuniquese con el administrador' 
    });
  }
}

const revalidateToken = ( req = request, res = response ) => {
  const { _id, name } = req.user;

  res.status(201).json({ 
    ok: true,
    token: generateJWT( _id, name ),
  });
}

const confirmAccount = async ( req = request, res = response ) => {
  const { token } = req.params;

  try {
    const user = await userModel.findOne({ token });
    if ( !user ) return res.status(404).json({ ok: false, msg: 'Token no válido' });

    user.confirmed = true;
    user.token = null;
    await user.save();

    return res.status(201).json({
      ok: true,
      msg: 'Cuenta Confirmada'
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({ 
      ok: false, 
      msg: 'Error del sistema, comuniquese con el administrador' 
    });
  }
}

const resetPassword = async ( req = request, res = response ) => {
  const { email } = req.body;

  try {
    const user = await userModel.findOne({ email });
    if ( !user ) return res.status(404).json({ ok: false, msg: 'No existe un usuario con este email' });

    if ( !user.confirmed ) return res.status(401).json({ ok: false, msg: 'El email no ha sido confirmado' });

    user.token = generateToken();
    await user.save();

    //Enviar Email

    return res.status(201).json({
      ok: true,
      msg: 'Hemos enviado las instrucciones a su correo'
    })
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: 'Error del sistema, comuniquese con el administrador'
    })
  }
}

const confirmToken = async ( req = request, res = response ) => {
  const { token } = req.params;

  try {
    const user = await userModel.findOne({ token });
    if ( !user ) return res.status(404).json({ ok: false, msg: 'Token no válido' });

    return res.status(201).json({
      ok: true,
      msg: 'Token válido'
    })
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: 'Error del sistema, comuniquese con el administrador'
    })
  }
}

const newPassword = async ( req = request, res = response ) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const user = await userModel.findOne({ token });
    if ( !user ) return res.status(404).json({ ok: false, msg: 'Usuario no encontrado' });

    user.token = null;
    user.password = password;
    await user.save();

    return res.status(200).json({
      ok: true,
      msg: 'Contraseña actualizada'
    })
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: 'Error del sistema, comuniquese con el administrador'
    })
  }
}

const profile = async ( req = request, res = response ) => {
  const { _id, name, email } = req.user;

  try {
    return res.status(200).json({
      ok: true,
      _id,
      name,
      email,
    })
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: 'Error del sistema, comuniquese con el administrador'
    })
  }
}

const changeProfile = async ( req = request, res = response ) => {
  const { id } = req.params;
  const { email } = req.body;

  try {
    const user = await userModel.findById( id );
    if ( !user ) return res.status(404).json({ ok: false, msg: 'Usuario no encontrado' });

    if ( user.email !== email ) {
      const emailExist = await userModel.findOne({ email });
      if ( emailExist ) return res.status(400).json({ ok: false, msg: 'El email ya está en uso' });
    }

    const newUser = {
      ...req.body,
    }
    const updateUser = await userModel.findByIdAndUpdate( id, newUser, { new: true } );

    return res.status(200).json({
      ok: true,
      user: updateUser,
    })
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: 'Error del sistema, comuniquese con el administrador'
    })
  }
}

const changePasswordProfile = async ( req = request, res = response ) => {
  const { _id } = req.user;
  const { oldPassword, newPassword } = req.body;

  try {
    const user = await userModel.findById( _id );
    if ( !user ) return res.status(404).json({ ok: false, msg: 'Usuario no encontrado' });

    if ( ! await userModel.matchPassword( oldPassword ) ) return res.status(400).json({ ok: false, msg: 'La contraseña es incorrecta' });

    user.password = newPassword;
    await user.save();
    
    return res.status(200).json({
      ok: true,
      msg: 'Contraseña actualizada correctamente'
    })
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: 'Error del sistema, comuniquese con el administrador'
    })
  }
}

export {
  authUser,
  createUser,
  revalidateToken,
  confirmAccount,
  resetPassword,
  confirmToken,
  newPassword,
  profile,
  changeProfile,
  changePasswordProfile,
}