// Host + /api/auth/*
import express from 'express';
import { check } from 'express-validator'; 

import { authUser, changePasswordProfile, changeProfile, confirmAccount, confirmToken, createUser, newPassword, profile, resetPassword, revalidateToken } from '../controllers/authController.js';
import { fieldsValidator } from '../middlewares/fieldsValidator.js';
import jwtValidator from '../middlewares/jwtValidator.js';

const routes = express.Router();

routes.post( '/login', [
  check('email', 'El email es obligatorio').isEmail(),
  fieldsValidator,
], authUser ); //pasó

routes.post( '/register', [
  check('name', 'El nombre es obligatorio').isLength({ min: 2 }),
  check('email', 'El email es obligatorio').isEmail(),
  check('password', `La contraseña debe tener mínimo 8 caracteres.Debe contener una letra minúscula.Debe contener una letra mayúscula. Debe contener un carácter especial.Debe contener mínimo un número.` ).isLength({ min: 8 }).matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, "i"),
  fieldsValidator,
], createUser ); //pasó

routes.get( '/confirm/:token', confirmAccount ); //pasó
routes.post( '/reset', [ check('email', 'El email es obligatorio').isEmail(), fieldsValidator ], resetPassword ); //pasó
routes.route( '/reset/:token' )
  .get( confirmToken )
  .post( [
    check('password', `La contraseña debe tener mínimo 8 caracteres.Debe contener una letra minúscula.Debe contener una letra mayúscula. Debe contener un carácter especial.Debe contener mínimo un número.` ).isLength({ min: 8 }).matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, "i"),
    fieldsValidator,
  ], newPassword ); //pasaron

routes.use( jwtValidator );

routes.get( '/renew', revalidateToken ); //pasó
routes.get( '/profile', profile ); //pasó
routes.put( '/profile/:id', [ check('email', 'El email es obligatorio').isEmail(), fieldsValidator ], changeProfile ); //pasó
routes.put( '/password-profile', [
  check('oldPassword', 'La contraseña actual es obligatorio').isLength({ min: 1 }),
  check('newPassword', `La contraseña debe tener mínimo 8 caracteres.Debe contener una letra minúscula.Debe contener una letra mayúscula. Debe contener un carácter especial.Debe contener mínimo un número.` ).isLength({ min: 8 }).matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, "i"),
  fieldsValidator,
], changePasswordProfile ); //pasó

export default routes;