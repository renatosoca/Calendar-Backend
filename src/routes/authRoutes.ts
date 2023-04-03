// Host + /api/auth/*
import { Router } from 'express';
import { check } from 'express-validator';
import { confirmAccount, forgotPassword, resetPassword, revalidateAuth, updateUserPassword, updateUserProfile, userAuth, userProfile, userRegister } from '../controllers';
import { checkSesion, fieldValidations } from '../middlewares';

const routes = Router();

routes.post('/login', [
  check('email', 'El email es obligatorio').isEmail(),
  check('password', `La contraseña debe tener mínimo 8 caracteres, una letra minúscula, una letra mayúscula y un carácter especial.`).isLength({ min: 8 }).matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, "i"),
  fieldValidations,
], userAuth); //pasó

routes.post('/register', [
  check('name', 'El nombre es obligatorio').isLength({ min: 1 }),
  check('lastname', 'El apellido es obligatorio').isLength({ min: 1 }),
  check('email', 'El email es obligatorio').isEmail(),
  check('password', `La contraseña debe tener mínimo 8 caracteres.Debe contener una letra minúscula.Debe contener una letra mayúscula. Debe contener un carácter especial.Debe contener mínimo un número.`).isLength({ min: 8 }).matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, "i"),
  fieldValidations,
], userRegister); //pasó

routes.get('/confirm-account/:token', confirmAccount); //pasó

routes.post('/forgot-password', [
  check('email', 'El email es obligatorio').isEmail(),
  fieldValidations,
], forgotPassword); //pasó

routes.post('/reset-password/:token', [
  check('password', `La contraseña debe tener mínimo 8 caracteres, una letra minúscula, una letra mayúscula y un carácter especial.`).isLength({ min: 8 }).matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, "i"),
  fieldValidations,
], resetPassword); //pasó

routes.use(checkSesion);

routes.get('/revalidateAuth', revalidateAuth); //pasó

routes.get('/profile', userProfile); //pasó

routes.put('/user-profile/:id', [
  check('id', 'El id del usuario es obligatorio').isMongoId(),
  check('email', 'El email es obligatorio').isEmail(),
  fieldValidations
], updateUserProfile);

routes.put('/password-profile', [
  check('oldPassword', 'La contraseña actual debe tener mínimo 8 caracteres.').isLength({ min: 8 }),
  check('newPassword', `La nueva contraseña debe tener mínimo 8 caracteres, una letra minúscula, una letra mayúscula y un carácter especial.`).isLength({ min: 8 }).matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, "i"),
  fieldValidations,
], updateUserPassword);

export default routes;